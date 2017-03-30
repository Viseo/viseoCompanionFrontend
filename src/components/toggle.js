/**
 * Created by VBO3596 on 27/03/2017.
 */
import React, {Component} from 'react';
import './horizontalToggleBar.css';
import {Button} from 'muicss/react'; //https://www.muicss.com/docs/v1/react

export default class HorizontalToggleBar extends Component {

    static defaultProps = {
        unselectedColor: '#f2f2f2',
        selectedTextColor: 'darkgrey'
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({selected: nextProps.selected});
    }

    toggleItem = () => {
        let becomeSelected = !this.state.selected;
        this.setState({
            selected: !this.state.selected
        });
        if(becomeSelected){
            this.props.onToggled(this.props.item);
        }
    }

    render() {
        let { selected } = this.state;
        return (
            <Button className="button" onClick={this.toggleItem}
                    style={{
                        backgroundColor: selected? this.props.color : this.props.unselectedColor,
                        color: selected? this.props.selectedTextColor : this.props.color
                    }}>
                {this.props.item}
            </Button>
        );
    }
}