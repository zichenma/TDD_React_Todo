import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    }
    handleInputChange = e => {
        this.setState({
            ...this.state,
            value : e.target.value
        })
    }
    handleInputKeyUp = e => {
        const { value } = this.state;
        const { addUndoItem } = this.props;
        if (e.keyCode === 13 && value) {
            addUndoItem(value);
            this.setState({...this.state, value : ''})
        }
    }
    render() {
        const { value } = this.state;
        return (
            <div>
                <input 
                data-test='input' 
                value={value} 
                onChange={this.handleInputChange}
                onKeyUp={this.handleInputKeyUp}/>
            </div>
        )
    }
}

export default Header;
