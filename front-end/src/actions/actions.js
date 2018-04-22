import axios from '../helpers/axios';
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

export function getReservationDateTimes() {
    return dispatch => {
        dispatch(requestReservationDateTimes());
        return axios.get('user')
            .then(res => dispatch(receiveReservationDateTimes(res)))
            .catch(() =>  dispatch(xhrFail()));
    }
}

function addNewReservation(res){
    return {
        type: actionTypes.ADD_NEW_RESERVATION,
        data: res.data
    };
}

export function makeReservation(reservation) {
    return dispatch => {
        return axios.post('user', JSON.stringify(reservation), {headers: {"Content-Type": "application/json"}})
            .then(res => dispatch(addNewReservation(res)))
            .catch(x => dispatch(xhrFail()));
    }
}

function requestRemoveReservation(reservation) {
    return {
        type: actionTypes.REQ_REMOVE_RESERVATION,
        data: reservation
    };
}

function removeReservationSuccess(reservation) {
    return {
        type: actionTypes.REMOVE_RESERVATION_SUCCESS,
        data: reservation
    }
}

export function removeReservation(reservation) {
    return dispatch => {
        dispatch(requestRemoveReservation(reservation));
        return axios.delete(`user/${reservation.id}`)
                    .then(res => dispatch(removeReservationSuccess(res.data)))
                    .catch(x => dispatch(xhrFail()));
    }
}