import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../data/actions';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

    this.props.loginUser(dataUser, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAunthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { loginUser })(Login);