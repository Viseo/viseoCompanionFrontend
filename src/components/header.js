import React, {Component} from 'react';
import './header.css';
import {Link} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div className="flex-container">
                <Link to="/home">
                    <div className="title">Viseo Companion</div>
                </Link>
                <div className="sousTitre">Espace administrateur</div>
            </div>
        );
    }
}

