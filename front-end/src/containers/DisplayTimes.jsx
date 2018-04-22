import React, {Component} from 'react';
import {connect} from "react-redux";
import {getReservationDateTimes, removeReservation} from '../actions/actions';

class DisplayTimes extends Component{

    componentDidMount(){
        this.props.getAllReservations();
    }

    render(){
        return(
            <table className={'table table-striped'}>
                <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Start Time
                    </th>
                    <th>
                        End Time
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.reservations && this.props.reservations.length > 0 ?
                        this.props.reservations.map(x => {
                            return(
                                <tr key={x.start_time}>
                                    <td>{x.name}</td>
                                    <td>{x.start_time}</td>
                                    <td>{x.end_time}</td>
                                    <td><button onClick={() => this.props.removeReservation(x)} type="button" class="btn btn-danger">Remove</button></td>
                                </tr>
                            )
                        })
                        :null
                }
                </tbody>
            </table>
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
        removeReservation: (reservation) => dispatch(removeReservation(reservation))
    }
};

export default connect(mapState, mapDispatch)(DisplayTimes);