import React, {Component} from 'react';
import Reservation from "../classes/reservation";
import {connect} from "react-redux";
import {getReservationDateTimes, makeReservation} from "../actions/actions";
import swal from 'sweetalert2';

class AddForm extends Component {
    constructor(){
        super();
        this.state = {
            reservation: new Reservation()
        };
        this.handleChange = this.handleChange.bind(this);
        this.reserveTime = this.reserveTime.bind(this);
    }

    handleChange(id, value) {
        switch (id) {
            case 'name' :
                this.setState({
                    reservation: {
                        ...this.state.reservation,
                        name: value
                    }
                });
                break;
            case 'StartTime':
                this.setState({
                    reservation: {
                        ...this.state.reservation,
                        start_time: value
                    }
                });
                break;
            case 'EndTime':
                this.setState({
                    reservation: {
                        ...this.state.reservation,
                        end_time: value
                    }
                });
                break;
        }
    }

    reserveTime() {
        try {
            if(Reservation.validateClass(this.state.reservation)) {
                this.props.makeReservation(this.state.reservation);
            }
        } catch(e) {
            swal(e.message);
        }
    }

    render() {
        return(
            <div className="form-group">
                <div className={'row'}>
                <div className={'col-md-4'}>
                    <label htmlFor="name">Name</label>
                    <input onChange={(event) => this.handleChange(event.target.id, event.target.value)} type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter name"/>
                </div>
                <div className={'col-md-4'}>
                    <label htmlFor="StartTime">Start Time</label>
                    <input onChange={(event) => this.handleChange(event.target.id, event.target.value)} type="datetime-local" className="form-control" id="StartTime" aria-describedby="StartTime" placeholder="Enter Start Time"/>
                </div>
                <div className={'col-md-4'}>
                    <label htmlFor="EndTime">EndTime</label>
                    <input onChange={(event) => this.handleChange(event.target.id, event.target.value)} type="datetime-local" className="form-control" id="EndTime" aria-describedby="EndTime" placeholder="Enter End Time"/>
                </div>
                </div>
                <div className={'row'}>
                    <div className={'col-md-12 top-buffer'}>
                        <button onClick={this.reserveTime} type="button" className="btn btn-primary">Reserve</button>
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
        getAllReservations: () => dispatch(getReservationDateTimes()),
        makeReservation: (reservation) => dispatch(makeReservation(reservation))
    }
};

export default connect(mapState, mapDispatch)(AddForm);