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
        case actionTypes.XHR_FAIL:
            return {
                ...prevState,
                fetching: false
            };
        default:
            return prevState;
    }
};

export default reducer;