import React, { Component } from 'react';

class UndoList extends Component {
  render() {
    const { list, deleteItem } = this.props;
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
                  key={`${item}-${index}`}
                  className="undo-list-item"
                >
                {item}
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