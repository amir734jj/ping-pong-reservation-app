import * as actionTypes from '../constants/actionTypes';
import Reservation from '../classes/reservation';

const initialState = {
    fetching: false,
    data: null
};

const reducer = (prevState = initialState, action) => {
    switch(action.type) {
        case actionTypes.REQ_GET_DATES:
            return Object.assign(prevState, {
               fetching: true
            });
        case actionTypes.RECV_GET_DATES:
            const classObjects = action.data.map(x => Object.assign(new Reservation(), x));
            return {
                ...prevState,
                data: classObjects,
                fetching: false
            };
        // data = [
        //   {
        //      "end_time": "Sat, 21 Apr 2018 23:55:08 GMT",
        //      "id": 1,
        //      "name": "test",
        //      "start_time": "Sat, 21 Apr 2018 23:30:08 GMT"
        //   }
        // ]
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