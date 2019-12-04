import React, { Component } from "react";
import axios from "axios";
import "../App.css";

export class Url extends Component {
  state = {
    url: "",
    link: ""
  };

  handleChange = e => {
    this.setState({
      url: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("api/shorten", {
        url: this.state.url
      })
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <div className="url">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <input
              type="text"
              name="url"
              placeholder="Enter Url"
              onChange={this.handleChange}
            />
            <input type="submit" value="shorten" />
          </fieldset>
          <fieldset>
            <span id="result">{this.state.link}</span>
          </fieldset>
        </form>
      </div>
    );
  }
}
