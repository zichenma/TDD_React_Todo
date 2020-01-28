import React, { Component } from 'react';
import Header from './components/Header'
import UndoList from './components/UndoList'
import './style.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: [],
    }
  }

  addUndoItem = value => {
    this.setState({
      undoList: [...this.state.undoList, { status : 'div', value }],
    })
  }

  deleteItem = index => {
    const newList = [...this.state.undoList];
    newList.splice(index, 1);
    this.setState({
      ...this.state,
      undoList: newList
    })
  }

  changeStatus = index => {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: 'input'
        }
      }
      return {
        ...item,
        status : 'div'
      }
    })
    this.setState({
      ...this.state,
      undoList : newList
    })
  }

  handleBlur = index => {

  }

  render() {
    const { undoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList list={undoList} 
        deleteItem={this.deleteItem} 
        changeStatus={this.changeStatus}
        handleBlur={this.handleBlur}
        />
      </div>
    )
  }
}

export default TodoList;