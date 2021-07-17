import React, { Component } from "react";
import UserDataService from "../services/userService";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        "Id": null,
        "Full Name": "",
        "Country": "",
        "Date of birth":"",
        "Email":"",
        "Created at": ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          title: title
        }
      };
    });
  }

  onChangeCountry(e) {
    const country = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        "Country": country
      }
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      "Id": this.state.currentUser["Id"],
      "Full Name": this.state.currentUser["Full Name"],
      "Country": this.state.currentUser["Country"],
      "Email": this.state.currentUser["Email"],
      "Date of birth": this.state.currentUser["Date of birth"],
      "Created at": this.state.currentUser["Created at"],
      published: status
    };

    UserDataService.update(this.state.currentUser["Id"], data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser["Id"],
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {   
    UserDataService.delete(this.state.currentUser["Id"])
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={currentUser["Country"]}
                  onChange={this.onChangeCountry}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentUser.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentUser.published ? (
              <button
                className=""
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className=""
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className=""
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className=""
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}
