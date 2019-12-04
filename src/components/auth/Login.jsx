import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../data/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { password, email } = this.state;
    const dataUser = { email, password };
    console.log(dataUser);

    this.props.loginUser(dataUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s8 offset-s2">
            <Link to="/" className="btn btn-flat waves-effect">
              Home
            </Link>
            <h1>
              <b>Login</b>
            </h1>
            <p className="grey-text text-darken-1 ">Don't have an account?</p>
            <Link to="/register">Register</Link>
            <form onSubmit={this.handleSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  name="email"
                  type="email"
                  id="email"
                  error={errors.email}
                  value={this.state.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  id="password"
                  errors={errors.password}
                  value={this.state.password}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11px" }}>
                <button
                  type="submit"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1em"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  LogIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}



export default connect(null, { loginUser })(Login);