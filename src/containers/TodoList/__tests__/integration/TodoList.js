import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import TodoList from '../../index';
import { findTestWrapper } from '../../../../utils/testUtils';
import store from '../../../../store/createStore';

// 如果不用 beforeEach 则每个测试用例都会调用 setTimeout
beforeEach(() =>{
    jest.useFakeTimers();
})


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
    2. 5 秒后
    2. 应该展示接口返回的数据
`, done => {
    const wrapper = mount(
        <Provider store={store}><TodoList /></Provider>
    );
    
  

    // 当页面渲染完毕时，还没有拿到异步的数据，所以 listItems.length 应该是 0，
    // 此时为了验证拿到异步数据后的效果，需要加一个 setTimeout， 这样 listItems.length 
    // 的长度才会变成 1，从而通过测试
    // setTimeout(() => {
    //     //update的作用是在100秒后更新成最新的组件，如果不更新，则测试不通过
    //     wrapper.update();
    //     console.log(wrapper.debug());
    //     const listItems = findTestWrapper(wrapper, 'list-item');
    //     expect(listItems.length).toBe(1);
    //     // done 告诉测试用例，执行结束了，详情参见基础课
    //     done();
    // }, 0);  

    // 也可以用 process.nextTick(）
    // 等当前时间片段执行完后再执行内部函数，其实就是伪异步
    // process.nextTick(() => {
    //     wrapper.update();
    //     const listItems = findTestWrapper(wrapper, 'list-item');
    //     expect(listItems.length).toBe(1);
    //     done();
    // })
   
    // 如果有setTimeout则用Jest提供的 Mock Timer
    // 让所有的Timers都立即执行
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    // 如果没有 process.nextTick 则是同步， process.nextTick 里的代码不会被执行， 测试将不会被通过
    process.nextTick(() => {
        wrapper.update();
        const listItems = findTestWrapper(wrapper, 'list-item');
        expect(listItems.length).toBe(1);
        done();
    })

})

