import React, {Component} from 'react';
import Reservation from "../classes/reservation";
import {connect} from "react-redux";
import {getReservationDateTimes} from "../actions/actions";

class AddForm extends Component {
    constructor(){
        super();
        this.state = {
            reservation: new Reservation
        };
    }
    render() {
        return(
            <div className="form-group">
                <div className={'row'}>
                <div className={'col-sm-4'}>
                    <label htmlFor="name">Name</label>
                    <input  type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter name"/>
                </div>
                <div className={'col-sm-4'}>
                    <label htmlFor="StartTime">Start Time</label>
                    <input type="datetime-local" className="form-control" id="StartTime" aria-describedby="StartTime" placeholder="Enter Start Time"/>
                </div>
                <div className={'col-sm-4'}>
                    <label htmlFor="EndTime">EndTime</label>
                    <input type="datetime-local" className="form-control" id="EndTime" aria-describedby="EndTime" placeholder="Enter End Time"/>
                </div>
                </div>
            </div>
        );
    }
}

const mapState = state => {
    return {
        reservations: state.data
    };
};

const mapDispatch = dispatch => {
    return {
        getAllReservations: () => dispatch(getReservationDateTimes())
    }
};

export default connect(mapState, mapDispatch)(AddForm);