import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';

export function requestReservationDateTimes() {
    return {
        type: actionTypes.REQ_GET_DATES
    };
}

export function receiveReservationDateTimes(res) {
    return {
        type: actionTypes.RECV_GET_DATES,
        data: res.data
    };
}

function xhrFail() {
    return {
        type: actionTypes.XHR_FAIL
    };
}

function throwXhrFail(message) {
    throw Error(message);
}

export function getReservationDateTimes() {
    return dispatch => {
        dispatch(requestReservationDateTimes());
        axios.get('http://localhost:5000/user')
            .then(res => dispatch(receiveReservationDateTimes(res)))
            
    }
}