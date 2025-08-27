import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/PreAuth/Login';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('Login Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    ).dive().dive();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).to.be.true;
  });

  it('renders email input field', () => {
    expect(wrapper.find('input[type="email"]')).to.have.lengthOf(1);
  });

  it('renders password input field', () => {
    expect(wrapper.find('input[type="password"]')).to.have.lengthOf(1);
  });

  it('renders sign in button', () => {
    expect(wrapper.find('button[type="submit"]')).to.have.lengthOf(1);
  });

  it('updates email state on input change', () => {
    const emailInput = wrapper.find('input[type="email"]');
    emailInput.simulate('change', { target: { value: 'test@example.com' } });
    expect(wrapper.state('email')).to.equal('test@example.com');
  });

  it('updates password state on input change', () => {
    const passwordInput = wrapper.find('input[type="password"]');
    passwordInput.simulate('change', { target: { value: 'password123' } });
    expect(wrapper.state('password')).to.equal('password123');
  });

  it('calls login function on form submission', () => {
    const loginSpy = sinon.spy(wrapper.instance(), 'login');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(loginSpy.calledOnce).to.be.true;
  });

  it('renders Google sign-in button', () => {
    expect(wrapper.find('button').findWhere(n => n.text().includes('Sign in with Google'))).to.have.lengthOf(1);
  });

  it('calls handleGoogleSignIn on Google button click', () => {
    const handleGoogleSignInSpy = sinon.spy(wrapper.instance(), 'handleGoogleSignIn');
    wrapper.instance().forceUpdate();
    wrapper.find('button').findWhere(n => n.text().includes('Sign in with Google')).simulate('click');
    expect(handleGoogleSignInSpy.calledOnce).to.be.true;
  });

 
});
