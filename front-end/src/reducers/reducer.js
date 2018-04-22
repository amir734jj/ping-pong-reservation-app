import * as actionTypes from '../constants/actionTypes';
import Reservation from '../classes/reservation';

const initialState = {
    fetching: false,
    data: []
};

const reducer = (prevState = initialState, action) => {
    switch(action.type) {
        case actionTypes.REQ_GET_DATES:
            return {
                ...prevState,
                fetching: true
            };
        case actionTypes.RECV_GET_DATES:
            const classObjects = action.data.map(x => Object.assign(new Reservation(), x));
            return {
                ...prevState,
                data: classObjects,
                fetching: false
            };
        case actionTypes.ADD_NEW_RESERVATION:
            let data = prevState.data.push(action.data);
            return {
                ...prevState,
                data
            };
        case actionTypes.REQ_REMOVE_RESERVATION:
            return {
                ...prevState,
                fetching: true
            };
        case actionTypes.REMOVE_RESERVATION_SUCCESS:
            let reservation = action.data;
            let newData = prevState.data.filter(x => x.id !== reservation.id);
            return {
                ...prevState,
                data: newData,
                fetching: false
            };
        case actionTypes.XHR_FAIL:
            return {
                ...prevState,
                fetching: false,
                error: action.data
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...prevState,
                error: undefined
            };
        default:
            return prevState;
    }
};

export default reducer;