import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';

test('TodoList initial list is empty', () => {
    const wrapper = shallow(<TodoList />); 
    expect(wrapper.state('undoList')).toEqual([]);
})

test('TodoList should pass an add undolist item method to Header', () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header'); 
    expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);
})

test('Header press enter, uodoList should add item', () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header'); 
    const addFunc = Header.prop('addUndoItem');
    addFunc('1234')
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toBe('1234');
    addFunc('12345')
    expect(wrapper.state('undoList').length).toBe(2);
})
