import { GET_ERRORS } from '../actions/types';

const INITIAL_STATE = {}

export default function (state = INITIAL_STATE, {type, payload}){
    switch(type){
        case GET_ERRORS:
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}