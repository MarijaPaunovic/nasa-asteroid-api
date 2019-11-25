import React, { Component } from "react";
import { Link } from "react-router-dom";

import '../App.css';

class SelectedAsteroids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAsteroids: [],
      disabled: true
    };

  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps !== this.props && this.props.selectedAsteroids.length) {
      return "new-asteroids";
    }
    return null;
  }

  componentDidUpdate(nextProps, nextState, snapshot) {
    if (snapshot === "new-asteroids") {
      this.setState({ disabled: false });
    }
  }

  removeFromList(asteroid) {
    const { selectedAsteroids } = this.props;

    selectedAsteroids.forEach((currentAsteroid, i) => {
      if (currentAsteroid.id === asteroid.id) {
        const newArr = selectedAsteroids.splice(i, 1);
        this.setState({ selectedAsteroids: [...newArr] });
      }
    });
  }

  displayAsteroids = () => {
    const { selectedAsteroids } = this.props;

    return selectedAsteroids.map(asteroid => (
      <li style={{ position: "relative" }} key={asteroid.id}>
        {asteroid.name}{" "}
        <span
          style={{ position: "absolute", right: 0, top: 0, cursor: "pointer" }}
          onClick={e => this.removeFromList(asteroid)}
        >
          x
        </span>
      </li>
    ));
  }

  render() {
    return (
      <div className="list-items-container">
        <ul className="list-items-holder">
          {this.displayAsteroids()}
        </ul>
        <Link to="/asteroid" >
          <button
            className={this.disabled ? 'btn disabled-btn' : 'btn'}>
            Number of passing by earth
          </button>
        </Link>
      </div>
    )
  }
}

export default SelectedAsteroids;
