import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../componets/Header';

Enzyme.configure({ adapter: new Adapter() });

test('Header 应该包含一个 input 匡', () => {
    const wrapper = shallow(<Header />); 
    const inputElem = wrapper.find("[data-test='input']");
    expect(inputElem).toExist();
})
test('Header input inital value should be empty', () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    expect(inputElem.prop('value')).toEqual('');

})
test('Header input value will change accrding to user input', () => {
    const wrapper = shallow(<Header />);
    const inputElem = wrapper.find("[data-test='input']");
    const userInput = '1234';
    inputElem.simulate('change', {
        target: { value: userInput}
    });
    // this is testing data after input (for unit test is better )
    expect(wrapper.state('value')).toEqual(userInput);
    const newInputElem = wrapper.find("[data-test='input']");
    // this is testing dom after input (for integration test is better)
    expect(newInputElem.prop('value')).toBe(userInput);

})