import React, { Component } from "react";
import UserDataService from "../services/userService";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      "Id": null,
      "Full Name": "",
      "Country": "",
      "Date of birth":"",
      "Email":"",
      "Created at": "",
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      "Full Name": e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      "Country": e.target.value
    });
  }

  saveUser() {
    var data = {
      "Full Name": this.state["Full Name"],
      "Country": this.state["Country"]
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          "Id": response.data["Id"],
          "Full Name": response.data["Full Name"],
          "Country": response.data["Country"],
          "Date of birth": response.data["Date of birth"],
          "Email": response.data["Email"],
          "Created at": Date.now(),
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      "Id": null,
      "Full Name": "",
      "Country": "",
      "Date of birth":"",
      "Email":"",
      "Created at": "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state["Full Name"]}
                onChange={this.onChangeTitle}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                required
                value={this.state["Country"]}
                onChange={this.onChangeCountry}
                name="country"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
