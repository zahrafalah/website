import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export default class SignupForm extends Component {
  state = {
    username: "",
    password: "",
    password_confirmation: "",
    registrationErrors: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    console.log("form submited");
    const { username, password } = this.state;
    axios
      .post("/signup", {
        username: username,
        password: password
      })
      .then(response => {
        console.log("response from the sign up: " + response);
      })
      .catch(error => {
        console.log("requst error", error);
      });
    event.preventDefault();
  };
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="../img/logos.png" /> Sign-up here
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User name"
              />

              <Form.Input
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                required
              />
              <Form.Input
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                name="password_confirmation"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm password"
                type="password"
                required
              />

              <Button type="submit" color="teal" fluid size="large">
                SignUp
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account <Link to="/Log-in">Log in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
