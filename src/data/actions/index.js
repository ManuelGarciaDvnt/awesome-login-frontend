import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import isEmpty from "is-empty";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const registerUser = (data, history) => {
  return dispatch => {
      dispatch({
        type: GET_ERRORS,
        payload: { name: "", email: "", password: "", repeatpassword: "" }
      })
      axios.post("https://fullstack-login.herokuapp.com/register", data)
      .then(res => {
        history.push("/login");
      })
      .catch(err => {
        console.log(err)
      })
      
    }
};


export const loginUser = (data, history) => {
  return dispatch => {
    axios
      .post("https://fullstack-login.herokuapp.com/login", data)
      .then(req => {
        const { token } = req.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        });

        dispatch({
          type: GET_ERRORS,
          payload: { email: "", password: "" }
        });
        history.push("/dashboard");
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: { ...err.response.data.errors }
        });
      });
  };
};

export const userLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = (history) => {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    history.push("/");
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  };
};
