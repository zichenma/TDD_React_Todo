import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';

it('TodoList 初始化列表为空', () => {
    const wrapper = shallow(<TodoList />); 
    expect(wrapper.state('undoList')).toEqual([]);
})

it('TodoList 应该给 Header 传递一个增加 undoList 内容的方法', () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header'); 
    expect(Header.prop('addUndoItem')).toBeTruthy();
})

it('addUndoItem 被执行的时候， 应该新增内容', () => {
    const wrapper = shallow(<TodoList />);
    // 这里尽量不要涉及到 Header， 因为这就有点像集成测试：
    // const Header = wrapper.find('Header');
    // const addFunc = Header.prop('addUndoItem');
    // addFunc('item 1');
    wrapper.instance().addUndoItem('item 1');
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toBe('item 1');
    wrapper.instance().addUndoItem('item 2');
    expect(wrapper.state('undoList').length).toBe(2);
})

test('TodoList 应该给未完成列表传递 list 数据，以及 deleteItem 方法', () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find('UndoList');
    expect(UndoList.prop('list')).toBeTruthy();
    expect(UndoList.prop('deleteItem')).toBeTruthy();
});

test('当deleteItem方法被执行的时候，UndoList 应该删除内容', () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
        undoList: ['item 1', 'item 2', 'item 3']
    })
    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual(['item 1', 'item 3']);
});
