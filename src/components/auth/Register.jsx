import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { registerUser } from '../../data/actions';

import PropTypes from 'prop-types';
import classnames from 'classnames'

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

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard")
    }
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
                  placeholder="Type your name"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  name="email"
                  type="email"
                  id="email"
                  errors={errors.email}
                  value={this.state.email}
                  placeholder="Type your email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  id="password"
                  errors={errors.password}
                  value={this.state.password}
                  placeholder="Type your password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.handleChange}
                  name="repeatpassword"
                  id="repeatpassword"
                  type="password"
                  errors={errors.repeatpassword}
                  value={this.state.repeatpassword}
                  placeholder="Repeat passsword"
                  className={classnames("", {
                    invalid: errors.repeatpassword
                  })}
                />
                <span className="red-text">{errors.repeatpassword}</span>
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
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  errors : PropTypes.object.isRequired
}


export default connect(mapStateToProps, { registerUser })(Register)