/**
 * Created by LMA3606 on 16/02/2017.
 */

import React, {Component} from 'react';
import './header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="flex-container">
                {/*<div className="App-header">*/}
                <div className="title">Viseo Companion</div>
                <div className="sousTitre">Espace administrateur</div>
                {/*</div>*/}
            </div>
        );
    }
}

