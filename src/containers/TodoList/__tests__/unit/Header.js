import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import { findTestWrapper } from '../../../../utils/testUtils';


describe("Header 组件", () => {
    it('样式渲染正常', () => {
        const wrapper = shallow(<Header />); 
        expect(wrapper).toMatchSnapshot();
    })

    it('组件中包含输入框', () => {
        const wrapper = shallow(<Header />); 
        const inputElem = findTestWrapper(wrapper, 'input');
        expect(inputElem).toExist();
    })

    it('输入框内容初始为空', () => {
        const wrapper = shallow(<Header />);
        const inputElem = findTestWrapper(wrapper, 'input');
        expect(inputElem.prop('value')).toEqual('');
    })
    
    it('输入框内容随用户输入变化', () => {
        const wrapper = shallow(<Header />);
        const inputElem = findTestWrapper(wrapper, 'input');
        const userInput = '1234';
        inputElem.simulate('change', {
            target: { value: userInput}
        });
        // this is testing data after input (for unit test is better )
        expect(wrapper.state('value')).toEqual(userInput);
    })
    
    it('输入框无内容时触发回车事件，无反应', () => {
        const fn = jest.fn();
        const wrapper = shallow(<Header addUndoItem={fn}/>);
        const inputElem = findTestWrapper(wrapper, 'input');
        wrapper.setState({value : ''});
        inputElem.simulate('keyUp', {
            keyCode: 13 // Enter key
        });
        expect(fn).not.toHaveBeenCalled();
    })
    
    it('输入框有内容被触发时，外部传入的函数被调用, 内容清空', () => {
        const fn = jest.fn();
        const wrapper = shallow(<Header addUndoItem={fn}/>);
        const inputElem = findTestWrapper(wrapper, 'input');
        const userInput = '1234';
        wrapper.setState({value : userInput});
        inputElem.simulate('keyUp', {
            keyCode: 13 // Enter key
        });
        expect(fn).toHaveBeenCalled();
        expect(fn).toHaveBeenLastCalledWith(userInput);
        const newInputElem = findTestWrapper(wrapper, 'input');
        expect(newInputElem.prop('value')).toBe('');
    })
})


