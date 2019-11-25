import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import '../App.css';

class RenderAsteroids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asteroids: [],
      asteroidURLs: [],
      approachDataArr: [],
      sortedArr: []
    };

  }

  componentDidMount() {
    this.setState(
      {
        asteroids: this.props.selectedAsteroids
      },
      () => {
        this.getUrlsFromContext(this.state.asteroids);
      }
    );
  }

  getUrlsFromContext(asteroids) {
    const urls = asteroids.map(asteroid => asteroid.links.self);
    this.setState({ asteroidURLs: urls }, () => {
      this.fetchAsteroidsData(this.state.asteroidURLs);
    });
  }

  fetchAsteroidsData(arrOfUrls) {
    let defaultPromise = Promise.resolve(200);
    arrOfUrls.forEach(url => {
      axios
        .all([
          axios.get(url).then(res => {
            const data = res.data;
            const asteroidInfoObj = {
              name: data.name,
              iterations: data.close_approach_data.length,
              dates: data.close_approach_data
            };
            this.setState({
              approachDataArr: [...this.state.approachDataArr, asteroidInfoObj]
            });
          }),
          defaultPromise
        ])
        .then(responses => {
          this.sortIterations();
        });
    });

    return null;
  }

  sortIterations() {
    let filteredByDate = [];
    this.state.approachDataArr.map(asteroid => {
      const holderObj = { name: asteroid.name, iterations: 0 }

      asteroid.dates.forEach(date => {
        const currentDate = date.close_approach_date;
        const year = currentDate.split("-");
        if (year[0] > 1900 && year[0] <= 1999) {
          holderObj.iterations += 1;
        }
      });
      filteredByDate.push(holderObj);
    });

    function compare(a, b) {
      if (a.iterations > b.iterations) return -1;
      if (a.iterations < b.iterations) return 1;
      return 0;
    }

    if (this.state.asteroids.length === this.state.approachDataArr.length) {
      this.setState({
        sortedArr: filteredByDate.sort(compare)
      });
    }
  }

  renderCharts() {
    const { sortedArr } = this.state;
    const referenceWidth = sortedArr[0].iterations;
    let chartWidth;
    return sortedArr.map((obj, index) => {
      const numberOfIterations = obj.iterations;
      const asteroidName = obj.name;
      chartWidth = obj.iterations / referenceWidth;

      return (
        <div key={obj.name}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "20%" }}>{asteroidName}</div>
            <div
              className="iteration"
              style={{
                width: `${chartWidth * 50}vw`,
                background: `${this.sortChartsByDanger(numberOfIterations)}`,
                animationDelay: `${index * 100}ms`,
                height: '40px',
                marginBottom: '10px',
                transformOrigin: '0 50%',
                visibility: 'hidden'
              }}
            >
              <span style={{ position: "absolute", top: 0, left: 0 }}>
                {numberOfIterations}
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  sortChartsByDanger(x) {
    if (x <= 25) {
      return "green";
    } else if (x <= 45) {
      return "yellow";
    } else if (x <= 75) {
      return "orange";
    } else if (x > 75) {
      return "red";
    } else {
      return "none";
    }
  }

  render() {
    if (this.state.sortedArr.length) {
      return <div>{this.renderCharts()}</div>;
    } else {
      return (
        <div style={{ marginTop: "20px" }}>
          <em>No selected asteroids</em>
        </div>
      );
    }
  }
}

const Asteroid = (props) => {
 
      return (
        <React.Fragment>
          <Link to="/">
            <button className="btn">
              Back
            </button>
          </Link>
          <RenderAsteroids {...props} />
        </React.Fragment>
       );
  };

export default Asteroid;
