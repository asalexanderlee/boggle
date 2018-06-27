import React, { Component } from "react";
import "./App.css";

export class Timer extends Component {
  render() {
    const minutes = Math.floor(this.props.value / 60);
    const seconds = this.props.value % 60;
    return (
      <div className="timer">
        {minutes} : {seconds}
      </div>
    );
  }
}
