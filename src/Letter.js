import React, { Component } from "react";
import "./App.css";

export class Letter extends Component {
  render() {
    return (
      <div
        className={this.props.class}
        id={"letter" + this.props.id}
        onMouseDown={() => {
          this.props.onMouseDown(this.props.id, this.props.value);
        }}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={() => {
          this.props.onMouseOver(this.props.id, this.props.value);
        }}
      >
        {this.props.value}
      </div>
    );
  }
}
