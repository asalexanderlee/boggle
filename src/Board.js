import React, { Component } from "react";
import "./App.css";
import { Letter } from "./Letter.js";

export class Board extends Component {
  renderLetter(id) {
    let letterClass = "letter";
    if (id === this.props.currentLetter.id) letterClass = "letter-current";
    else if (this.props.board[id].isSelected) letterClass = "letter-selected";
    return (
      <Letter
        value={this.props.board[id].value}
        id={id}
        score={this.props.board[id].score}
        class={letterClass}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
      />
    );
  }
  render() {
    return (
      <div id="outer-box">
        <div id="box">
          <table>
            <tbody>
              <tr className="row">
                <td>{this.renderLetter(0)}</td>
                <td>{this.renderLetter(1)}</td>
                <td>{this.renderLetter(2)}</td>
                <td>{this.renderLetter(3)}</td>
              </tr>
              <tr className="row">
                <td>{this.renderLetter(4)}</td>
                <td>{this.renderLetter(5)}</td>
                <td>{this.renderLetter(6)}</td>
                <td>{this.renderLetter(7)}</td>
              </tr>
              <tr className="row">
                <td>{this.renderLetter(8)}</td>
                <td>{this.renderLetter(9)}</td>
                <td>{this.renderLetter(10)}</td>
                <td>{this.renderLetter(11)}</td>
              </tr>
              <tr className="row">
                <td>{this.renderLetter(12)}</td>
                <td>{this.renderLetter(13)}</td>
                <td>{this.renderLetter(14)}</td>
                <td>{this.renderLetter(15)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
