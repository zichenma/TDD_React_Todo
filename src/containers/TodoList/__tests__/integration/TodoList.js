import React from 'react';
import { mount } from 'enzyme';
import TodoList from '../../index';
import { findTestWrapper } from '../../../../utils/testUtils';


it(`
    1. 用户会在header输入框输入内容
    2. 用户会点击回车按钮
    3. 列表项应该怎家用户输入内容的列表项
`, () => {
    const wrapper = mount(<TodoList />);
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


