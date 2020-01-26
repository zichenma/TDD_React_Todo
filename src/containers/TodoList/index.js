import React, { Component } from 'react';
import Header  from './componets/Header';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            undoList : []
        }
    }
    addUndoItem = value => {
        this.setState({
            ...this.state,
            undoList : [...this.state.undoList, value],
        })
    }
    render() {
        return (
           <div>
            <Header addUndoItem={this.addUndoItem}/> 
            {
                this.state.undoList.map(item => {
                    return <div key={item}>{item}</div>;
                })
            }
           </div>
        )
    }
}

export default TodoList;
