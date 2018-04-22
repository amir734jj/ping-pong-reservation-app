import React, {Component} from 'react';

export default class DisplayTimes extends Component{
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
                                <tr>
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