import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import TodoList from '../../index';
import { findTestWrapper } from '../../../../utils/testUtils';
import store from '../../../../store/createStore';

// 如果用TDD方法测试Redux，如果数据变了，每一个测试用例都必须要变更，
// 但如果用BDD则只需要引入Redux和Store即可 
it(`
    1. 用户会在header输入框输入内容
    2. 用户会点击回车按钮
    3. 列表项应该怎家用户输入内容的列表项
`, () => {
    const wrapper = mount(
        <Provider store={store}><TodoList /></Provider>
    );
    const inputElem = findTestWrapper(wrapper, 'input');
    const content = 'Dell lee';
    inputElem.simulate('change', {
        target: { value: content}
    });
    inputElem.simulate('keyUp', {
        keyCode: 13 // Enter key
    });
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(listItems.length).toBe(1);
    expect(listItems.text()).toContain(content);
})
 
it(`
    1. 用户打开页面
    2. 应该展示接口返回的数据
`, () => {
    const wrapper = mount(
        <Provider store={store}><TodoList /></Provider>
    );
    // 当页面渲染完毕时，还没有拿到异步的数据，所以 listItems.length 应该是 0，
    // 此时为了验证拿到异步数据后的效果，需要加一个 setTimeout， 这样 listItems.length 
    // 的长度才会变成 1，从而通过测试
    setTimeout(() => {
        const listItems = findTestWrapper(wrapper, 'list-item');
        expect(listItems.length).toBe(1);
    }, 100);  
   
  
})

