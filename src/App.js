import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";
import { NASA_URL } from "./shared/constants";

import './App.css';

import Header from './pages/Header';
import Main from './pages/Main';
import Asteroid from './pages/asteroid';

// const AppContext = React.createContext();

// export const AppConsumer = AppContext.Consumer;

class App extends Component {

  state = {
    startDate: "",
    endDate: "",
    asteroids: [],
    selectedAsteroids: [],
    asteroidNames: [],
    userInput: "",
    filteredAsteroids: [],
    disabled: true
    // updateSelectedAsteroids: asteroids => {
    //   this.setState({ selectedAsteroids: asteroids });
    // }
  };

  fetchAPI() {
    const start = this.state.startDate;
    const end = this.state.endDate;
    let asteroidsArray = [];

    axios
      .get(NASA_URL(start, end))
      .then(res => {
        const asteroids = res.data;
        this.setState({ asteroids })

        for (const date in this.state.asteroids.near_earth_objects) {
          this.state.asteroids.near_earth_objects[date].map(singleAsteroid => {
              if (singleAsteroid.is_potentially_hazardous_asteroid === true) {
                return asteroidsArray.push(singleAsteroid)
              }
            }
          );
        }
        this.setState({ filteredAsteroids: asteroidsArray });
      });
  }

  getUrlsFromContext(asteroids) {
    const urls = asteroids.map(asteroid => asteroid.links.self);
    this.setState({ asteroidURLs: urls }, () => {
      this.fetchAsteroidsData(this.state.asteroidURLs);
    });
  }

  render() {

    return (
      <Router>

        <Header />

        <Route exact path='/' render={props => (
          <React.Fragment>
            <div className="container">
            <div className="row">
            {/* <AppContext.Provider value={{ state: this.state }}> */}

              <Main
                fetchAPI={this.fetchAPI}
                getUrlsFromContext={this.getUrlsFromContext}
                value={{ state: this.state }}
              />

            </div>
            </div>
          </React.Fragment>
        )} />

        <Route path='/asteroid' render={props => (
          <React.Fragment>

            <Asteroid value={{ state: this.state }}
            fetchAPI={this.fetchAPI}
            getUrlsFromContext={this.getUrlsFromContext}
            />


          </React.Fragment>
        )} />

      </Router>
    );

  }
}

export default App;
