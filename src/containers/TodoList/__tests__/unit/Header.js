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
})
test('Header if input value is empty, nothing should happen after press Enter key', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn}/>);
    const inputElem = wrapper.find("[data-test='input']");
    wrapper.setState({value : ''});
    inputElem.simulate('keyUp', {
        keyCode: 13 // Enter key
    });
    expect(fn).not.toHaveBeenCalled();
})
test('Header if input value is NOT empty, fn should be called after press Enter key', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn}/>);
    const inputElem = wrapper.find("[data-test='input']");
    const userInput = '1234';
    wrapper.setState({value : userInput});
    inputElem.simulate('keyUp', {
        keyCode: 13 // Enter key
    });
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(userInput);
})
test('Header if input value is NOT empty, shoud be removed', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn}/>);
    const inputElem = wrapper.find("[data-test='input']");
    const userInput = '1234';
    wrapper.setState({value : userInput});
    inputElem.simulate('keyUp', {
        keyCode: 13 // Enter key
    });
    const newInputElem = wrapper.find("[data-test='input']");
    expect(newInputElem.prop('value')).toBe('');
})