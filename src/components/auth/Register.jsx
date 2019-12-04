import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { registerUser } from '../../data/actions'

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      repeatpassword: "",
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
    const { name, password, repeatpassword, email } = this.state;
    const newUser = { name, email, password, repeatpassword };
    
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn btn-flat waves-effect">
              Home
            </Link>
            <div
              className="col s12"
              style={{
                paddingLeft: "11px"
              }}
            >
              <h4>
                <b>Register</b> bellow
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account?
                <Link to="/login">Login</Link>
              </p>
            </div>

            <form onSubmit={this.handleSubmit} noValidate>
              <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  id="name"
                  name="name"
                  type="text"
                  errors={errors.name}
                  value={this.state.name}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  name="email"
                  type="email"
                  id="email"
                  errors={errors.email}
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
              <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  name="repeatpassword"
                  id="repeatpassword"
                  type="password"
                  errors={errors.repeatpassword}
                  value={this.state.repeatpassword}
                />
                <label htmlFor="password">Repeat Password</label>
              </div>
              <div className="col s12" style={{paddingLeft: "11px"}}>
                <button type="submit" style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1em"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >Register</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(null, { registerUser })(Register)