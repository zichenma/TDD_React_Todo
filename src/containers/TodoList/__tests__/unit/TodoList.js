import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';


describe('TodoList 组件', () => {
    it('TodoList 初始化列表为空', () => {
        const wrapper = shallow(<TodoList />); 
        expect(wrapper.state('undoList')).toEqual([]);
    })
    
    it('Header 组件存在 addUndoItem 属性', () => {
        const wrapper = shallow(<TodoList />);
        const Header = wrapper.find('Header'); 
        expect(Header.prop('addUndoItem')).toBeTruthy();
    })
    
    it('addUndoItem 方法被调用， undoList 数据项增加', () => {
        const wrapper = shallow(<TodoList />);
        // 这里尽量不要涉及到 Header， 因为这就有点像集成测试：
        // const Header = wrapper.find('Header');
        // const addFunc = Header.prop('addUndoItem');
        // addFunc('item 1');
        const { addUndoItem } = wrapper.instance();
        const content = 'item 1';
        addUndoItem(content);
        expect(wrapper.state('undoList').length).toBe(1);
        expect(wrapper.state('undoList')[0]).toEqual({status : 'div', value : content});
        addUndoItem(content);
        expect(wrapper.state('undoList').length).toBe(2);
    })
    
    it('UndoList 组件应该接收 list, deleteItem, changeStatus, handleBlur 参数', () => {
        const wrapper = shallow(<TodoList />);
        const UndoList = wrapper.find('UndoList');
        expect(UndoList.prop('list')).toBeTruthy();
        expect(UndoList.prop('deleteItem')).toBeTruthy();
        expect(UndoList.prop('changeStatus')).toBeTruthy();
        expect(UndoList.prop('handleBlur')).toBeTruthy();
    });
    
    it('deleteItem 方法被调用，undoList 数据项被删除', () => {
        const wrapper = shallow(<TodoList />);
        const data = [
            { status: 'div', value: '学习Jest'}, 
            { status: 'div', value: '学习TDD'}, 
            { status: 'div', value: '学习单元测试'}];
        wrapper.setState({ undoList: data })
        wrapper.instance().deleteItem(1);
        expect(wrapper.state('undoList')).toEqual([data[0], data[2]]);
    });

    it('changeStatus 方法被调用，undoList 数据项status被修改', () => {
        const wrapper = shallow(<TodoList />);
        const data = [
            { status: 'div', value: '学习Jest'}, 
            { status: 'div', value: '学习TDD'}, 
            { status: 'div', value: '学习单元测试'}];
        wrapper.setState({ undoList: data })
        wrapper.instance().changeStatus(1);
        expect(wrapper.state('undoList')[1]).toEqual({
            ...data[1],
            status: 'input'
        });
    });

    // it('handleBlur 方法被调用，undoList 数据项status被修改', () => {
    //     const wrapper = shallow(<TodoList />);
    //     const data = [
    //         { status: 'div', value: '学习Jest'}, 
    //         { status: 'div', value: '学习TDD'}, 
    //         { status: 'div', value: '学习单元测试'}];
    //     wrapper.setState({ undoList: data })
    //     wrapper.instance().changeStatus(1);
    //     expect(wrapper.state('undoList')[1]).toEqual({
    //         ...data[1],
    //         status: 'input'
    //     });
    // });

})


