import React, { Component } from 'react';
import '../App.css';
import {getReservationDateTimes} from "../actions/actions";
import {connect} from 'react-redux';

class Main extends Component {

    render() {
        try{
            this.props.getAllReservations();
        } catch (e) {
            console.log(e.message);
        }
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Ping Pong Table Scheduler</h1>
                </header>


            </div>
        );
    }
}

const mapState = (state) => {
    return {
        reservations: state.data
    };
};

const mapDispatch = dispatch => {
    return {
        getAllReservations: () => dispatch(getReservationDateTimes())
    }
};

export default connect(mapState, mapDispatch)(Main);
