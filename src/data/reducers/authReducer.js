import { SET_CURRENT_USER, USER_LOADING } from '../actions/types';
import isEmpty from 'is-empty';

const INITIAL_STATE = {
    isAuthenticated: false,
    user: [],
    loading: false
}

export default function (state = INITIAL_STATE, {type, payload}){
    switch(type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(payload)
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}