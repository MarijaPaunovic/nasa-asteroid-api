import React, { Component } from "react";
// import axios from "axios";

import Layout from "../components/MainLayout";
import Table from "../components/Table";
import Autocomplete from "../components/Autocomplete";
import { daysDifference } from "../shared/utils";
// import { NASA_URL } from "../shared/constants";

import '../App.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: "",
      endDate: "",
      asteroids: [],
      filteredAsteroids: [],
      disabled: true
    };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.startDate !== this.state.startDate) {
      return "newStart";
    }
    if (prevState.endDate !== this.state.endDate) {
      return "newEnd";
    }
    return null;
  }

  componentDidUpdate(nextProps, nextState, snapshot) {
    if (snapshot === "newStart") {
      this.updateDateInput();
    } else if (snapshot === "newEnd") {
      this.updateDateInput();
    }
  }

  // Show asteroids button - visible or not 
  updateDateInput() {
    const allowAsteroidsFetch = daysDifference(
      this.state.startDate,
      this.state.endDate
    );
    allowAsteroidsFetch
      ? this.setState({ disabled: false })
      : this.setState({ disabled: true });
  }

  // fetchAPI() {
  //   const start = this.state.startDate;
  //   const end = this.state.endDate;
  //   let asteroidsArray = [];

  //   axios
  //     .get(NASA_URL(start, end))
  //     .then(res => {
  //       const asteroids = res.data;
  //       this.setState({ asteroids })

  //       for (const date in this.state.asteroids.near_earth_objects) {
  //         this.state.asteroids.near_earth_objects[date].map(singleAsteroid => {
  //             if (singleAsteroid.is_potentially_hazardous_asteroid === true) {
  //               return asteroidsArray.push(singleAsteroid)
  //             }
  //           }
  //         );
  //       }
  //       this.setState({ filteredAsteroids: asteroidsArray });
  //     });
  // }

  // Date input
  handleDate(e, dateType) {
    if (dateType === "start") {
      this.setState({
        startDate: e.target.value
      });
    } else if (dateType === "end") {
      this.setState({
        endDate: e.target.value
      });
    }
  }
  
  updateSelectedAsteroids = asteroidName => {
    // let asteroidExists = false;

    if (!this.state.selectedAsteroids.length) {
      this.findAsteroids(asteroidName);
      this.setState({ userInput: "", asteroidNames: [asteroidName] });
    } else {
      const exists = this.state.asteroidNames.find(name => {
        return name === asteroidName;
      });
      if (exists === asteroidName) {
        alert(`${asteroidName} is already in the list of selected asteroids`);
        this.setState({ userInput: "" });
        return;
      } else if (exists !== asteroidName) {
        this.findAsteroids(asteroidName);
        this.setState(prevState => ({
          asteroidNames: [...prevState.asteroidNames, asteroidName],
          userInput: ""
        }));
      }
    }
  };

  render() {

    return (
      <Layout>
        <div className="info-container">
        <p>Please select 7 days between Start date and End date</p>
          <div className="info-date-inner-container">
            <span className="info-h">Start date:</span>
            <input
              className="info-date-input"
              type="date"
              onChange={e => this.handleDate(e, "start")}
              value={this.state.startDate}
            />
          </div>
          <div className="info-date-inner-container">
            <span className="info-h">End date:</span>
            <input
              className="info-date-input"
              type="date"
              onChange={e => this.handleDate(e, "end")}
              value={this.state.endDate}
            />
          </div>
          <div style={{ margin: "20px 0", textAlign: "right" }}>
            <button
              disabled={this.state.disabled}
              className={this.state.disabled ? "btn disabled-btn" : "btn"}
              onClick={this.props.fetchAPI.bind(this)}
            >
              Show Asteroids
            </button>
          </div>
        </div>
        { this.state.filteredAsteroids.length > 0 &&
          <Table
           asteroids={this.state.asteroids}
           filteredAsteroids={this.state.filteredAsteroids}
         />
        }
        { this.state.filteredAsteroids.length > 0 &&
         <Autocomplete
           asteroids={this.state.asteroids}
           filteredAsteroids={this.state.filteredAsteroids}
         /> 
        }
      </Layout>
    );
  }
}


export default Main;
