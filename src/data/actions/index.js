import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

export const registerUser = (data, history) => {
    return async(dispatch)=> {
        try {
            const req = await axios.post("/register", data);
            history.push("/");

        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error
            })
        }
        
    }
}

export const loginUser = (data, history) => {
    return async(dispatch)=>{
        try {
            const req = await axios.post("/login", data);
            const {token} = req.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);
            const decoded = jwtDecode(token);

            dispatch({
                type: SET_CURRENT_USER,
                payload: decoded
            })
            
        } catch (error) {
            dispatch({
                type: GET_ERRORS,
                error
            })
        }
    }
}

export const userLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const logoutUser = () => {
    return (dispatch)=>{
        localStorage.removeItem("jwtToken");
        setAuthToken(false);

        dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        })
    }
}