export default class Reservation {

    constructor(name, start_time, end_time, id) {
        this.name = name;
        this.start_time = start_time;
        this.end_time = end_time;
        this.id = id;

    }

    static validateClass(reservation) {
        if(!reservation.name || reservation.name === '') {
            throw new Error('Please enter a name');
        }
        if(!reservation.start_time || (new Date(reservation.start_time)).getTime() < (new Date()).getTime()){
            throw new Error('Incorrect start time');
        }
        if(!reservation.end_time || (new Date(reservation.end_time)).getTime() < (new Date(reservation.start_time)).getTime()){
            throw new Error('Incorrect end time');
        }
        return true;
    }
}