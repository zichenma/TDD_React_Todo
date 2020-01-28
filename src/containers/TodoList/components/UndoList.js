import React, { Component } from 'react';

class UndoList extends Component {
  render() {
    const { list, deleteItem, changeStatus, handleBlur } = this.props;
    return (
      <div className="undo-list">
        <div className="undo-list-title">
            Working on...
            <div data-test="count" className="undo-list-count">{list.length}</div>
        </div>
        <ul className="undo-list-content">
          {
            list.map((item, index) => {
              return (
                <li 
                  data-test="list-item"
                  key={index}
                  className="undo-list-item"
                  onClick={() => changeStatus(index)}
                >
                {
                  item.status === 'div' ? item.value : (
                    <input 
                    data-test="input" 
                    value={item.value}
                    onBlur={() => handleBlur(index)}
                    />
                  )
                }
                <div
                  data-test="delete-item"
                  onClick={() => {deleteItem(index)}}
                  className="undo-list-delete"
                >-</div>
              </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default UndoList;