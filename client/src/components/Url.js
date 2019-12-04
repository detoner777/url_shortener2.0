import React, { Component } from "react";
import axios from "axios";
import validator from "validator";
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
    const validURL = validator.isURL(this.state.url, {
      require_protocol: true
    });
    if (!validURL) {
      alert(
        "Please ensure this url is correct and includes the http(s) protocol"
      );
    } else {
      console.log("URL is: ", this.state.url);
      axios
        .post("http://localhost:5000/api/shorten", {
          url: this.state.url
        })
        .then(res => {
          this.setState({
            link: `https://skorochuvach.ink/${res.data.hash}`
          });
        })
        .catch(err => console.log(err));
    }
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
