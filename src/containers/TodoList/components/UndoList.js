import React, { Component } from 'react';

class UndoList extends Component {
  render() {
    const { list, deleteItem, changeStatus, handleBlur, valueChange } = this.props;
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
                    className="undo-list-item-input"
                    data-test="input" 
                    value={item.value}
                    onBlur={() => handleBlur(index)}
                    onChange={e => valueChange(index, e.target.value)}
                    />
                  )
                }
                <div
                  data-test="delete-item"
                  onClick={e => {
                    // 如果不判断 e 是否存在，则jest会报错，因为 e 没有被jest模拟
                    e && e.stopPropagation();
                    deleteItem(index)
                  }}
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