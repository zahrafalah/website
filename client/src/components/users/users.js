import React, { Component } from "react";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    };
  }
  //runs automatically when the component mounts
  componentDidMount() {
    //fetch call
    fetch("/api/user")
      .then(res => res.json())
      .then(user =>
        this.setState({ user: user }, () => console.log("user fetched", user))
      )
      .catch(err => {
        // do something with the error
      });
  }

  createUser = user => {
    fetch("/api/user", {
      method: "POST",
      //This is what I want to send out
      body: user
    })
      .then(res => res.json())
      .then(user =>
        this.setState({ user: user }, () => console.log("user fetched", user))
      )
      .catch(err => {
        // do something with the error
      });
  };

  render() {
    return (
      <div>
        <h2>Users:</h2>
        <ul>
          {this.state.user.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default User;
