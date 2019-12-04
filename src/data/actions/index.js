import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import isEmpty from "is-empty";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const registerUser = (data, history) => {
  return async dispatch => {
    try {
      dispatch({
        type: GET_ERRORS,
        payload: { name: "", email: "", password: "", repeatpassword: "" }
      })
      await axios.post("/register", data);
      history.push("/login");
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const loginUser = (data, history) => {
  return dispatch => {
    axios.post("/login", data).then(req => {
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
          payload: { email: "", password: ""}
        });
        history.push("/dashboard")
      }
    ).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: {...err.response.data.errors}
        })
    })
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
