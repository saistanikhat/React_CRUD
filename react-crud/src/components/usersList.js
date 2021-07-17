import React, { Component } from "react";
import UserDataService from "../services/userService";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';
import {AutoSizer} from 'react-virtualized';

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCountry = this.onChangeSearchCountry.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchCountry = this.searchCountry.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchCountry: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchCountry(e) {
    const searchCountry = e.target.value;

    this.setState({
      searchCountry
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        console.log(response)
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCountry() {
    this.setState({
      currentUser: null,
      currentIndex: -1
    });

    UserDataService.findByCountry(this.state.searchCountry)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchCountry, users, currentUser, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by country"
              value={searchCountry}
              onChange={this.onChangeSearchCountry}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCountry}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user["Full Name"]}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User Card</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUser["Full Name"]}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser["Email"]}
              </div>
              <div>
                <label>
                  <strong>Date of Birth:</strong>
                </label>{" "}
                {currentUser["Date of birth"]}
              </div>

              <div>
                <label>
                  <strong>Country:</strong>
                </label>{" "}
                {currentUser["Country"]}
              </div>

              <Link
                to={"/users/" + currentUser["Id"]}
                className=""
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a card...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
