import React from 'react';
// import ReactDOM from 'react-dom'; // Enzyme 是对 ReactDOM 的封装，所以有了 Enzyme 则不需要 ReactDOM
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import App from './App';



Enzyme.configure({ adapter: new Adapter() });


test('test renders hello world', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
  
});

test('test to get App class has a title', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  // const container = div.getElementsByClassName('App');
  // expect(container.length).toBe(1);
  const wrapper = shallow(<App />); // 浅渲染：仅仅渲染父级组件，子级组件用一个标记代替
  // const wrapper = mount(<App />); // 全渲染 当作为集成测试的时候可用
  // console.log(wrapper.find('.app-container')); // => ShallowWrapper {}
  // console.log(wrapper.find('.app-container').length); // => 1
  // expect(wrapper.find('.app-container').length).toBe(1); //耦合度高
  // expect(wrapper.find('[data-test="container"]').length).toBe(1);
  // console.log(wrapper.debug()); // 可以打印节点 => <div className="app-container" title="dell lee"> hello world </div>
  // expect(wrapper.find('[data-test="container"]').prop('title')).toBe('dell lee');
  // 用了 jest-enzyme 之后可以写成：
  const container = wrapper.find('[data-test="container"]');
  expect(wrapper).toMatchSnapshot(); // 对测试组件的内容有用，比如改为 hello world！ 就不会通过，因为多了个‘！’
  expect(container).toExist();
  expect(container).toHaveProp('title', 'dell lee')
})