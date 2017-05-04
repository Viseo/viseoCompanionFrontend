/**
 * Created by VBO3596 on 27/03/2017.
 */
import React, {Component} from 'react';
import './horizontalToggleBar.css';
import Toggle from './toggle.js'
import {Container, Col} from 'muicss/react'; //https://www.muicss.com/docs/v1/react

export default class HorizontalToggleBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: this.props.selectedCategory
        };
    }

    componentWillReceiveProps({selectedCategory}) {
        this.setState({
            selectedCategory
        })
    }

    selectCategory = (itemName) => {
        this.setState({selectedCategory: itemName});
        this.props.onCategorySelected(itemName);
    }

    IsSelected = (itemName) => {
        return this.state.selectedCategory === itemName;
    }

    render() {
        return (
                <Container className="bar">
                    <Col className="toggleItemCol" md="4">
                        <Toggle
                            selected={this.IsSelected(this.props.items[0])}
                            onToggled={(itemName) => this.selectCategory(itemName)}
                            item={this.props.items[0]}
                            color={this.props.colors[0]}/>
                    </Col>
                    <Col className="toggleItemCol" md="4">
                        <Toggle
                            selected={this.IsSelected(this.props.items[1])}
                            onToggled={(itemName) => this.selectCategory(itemName)}
                            item={this.props.items[1]}
                            color={this.props.colors[1]}/>
                    </Col>
                    <Col className="toggleItemCol" md="4">
                        <Toggle
                            selected={this.IsSelected(this.props.items[2])}
                            onToggled={(itemName) => this.selectCategory(itemName)}
                            item={this.props.items[2]}
                            color={this.props.colors[2]}/>
                    </Col>
                </Container>
        );
    }
}