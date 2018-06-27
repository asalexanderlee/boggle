import React, { Component } from "react";
import "./App.css";

export class Start extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="blackout" />
        <div className="boggle">
          B<span className="boggle-num">3</span>O<span className="boggle-num">1</span>G<span className="boggle-num">
            2
          </span>G<span className="boggle-num">2</span>L<span className="boggle-num">1</span>E<span className="boggle-num">
            1
          </span>
        </div>
        <div className="go" onClick={this.props.onStart}>
          GO!
        </div>
      </React.Fragment>
    );
  }
}
