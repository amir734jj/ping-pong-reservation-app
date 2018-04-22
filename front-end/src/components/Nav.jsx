import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {Route} from "react-router";

export default class Nav extends Component {
    render(){

        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to={'/'}><div className="nav-link">Home</div></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/reserve'}><div className="nav-link">Reserve</div></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}