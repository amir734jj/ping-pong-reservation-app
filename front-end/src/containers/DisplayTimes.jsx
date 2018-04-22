import React, {Component} from 'react';
import {connect} from "react-redux";
import {getReservationDateTimes} from '../actions/actions';

class DisplayTimes extends Component{

    componentDidMount(){
        if(this.props.reservations && this.props.reservations.length < 1)
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
        getAllReservations: () => dispatch(getReservationDateTimes())
    }
};

export default connect(mapState, mapDispatch)(DisplayTimes);