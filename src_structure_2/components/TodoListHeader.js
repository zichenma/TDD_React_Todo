import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../containers/TodoListPage/store';

class Header extends Component {
    
    handleInputKeyUp = e => {
        const { addUndoItem, handleInputChange,  value } = this.props;
        if (e.keyCode === 13 && value) {
            addUndoItem(value);
            handleInputChange('');
        }
    }
    render() {
        const { value, handleInputChange } = this.props;
        return (
            <div className="header">
                <div className="header-content">
                    TodoList
                        <input 
                        placeholder="Todo"
                        className='header-input'
                        data-test='input' 
                        value={value} 
                        onChange={e => handleInputChange(e.target.value)}
                        onKeyUp={this.handleInputKeyUp}/>
                    </div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        value: state.todo.inputValue
    }
}

const mapDispatch = dispatch => ({
    handleInputChange(value) {
        dispatch(actions.changeInputValue(value));
    }
})

export default connect(mapState, mapDispatch)(Header);
