import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const reducer = (prevState = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_DATES:
            return Object.assign(prevState, { data: action.data });
        // data = [
        //   {
        //      "end_time": "Sat, 21 Apr 2018 23:55:08 GMT",
        //      "id": 1,
        //      "name": "test",
        //      "start_time": "Sat, 21 Apr 2018 23:30:08 GMT"
        //   }
        // ]
        default:
            return prevState;
    }
};

export default reducer;