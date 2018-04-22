import React, { Component } from 'react';
import '../App.css';
import {getReservationDateTimes} from '../actions/actions';
import DisplayTimes from '../components/DisplayTimes';
import {connect} from 'react-redux';
import swal from 'sweetalert2';

class Main extends Component {
    componentDidMount(){
        if(!this.props.reservations)
            this.props.getAllReservations();
    }

    componentWillUpdate(nextProps){
        console.log(nextProps.reservations);
    }

    render() {

        if(this.props.error)
            swal(this.props.error);

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Ping Pong Table Scheduler</h1>
                </header>
                <div className={'container'}>
                <DisplayTimes
                    key={Math.random()}
                    reservations={this.props.reservations}
                />
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

export default connect(mapState, mapDispatch)(Main);
