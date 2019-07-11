import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Overlay from './Overlay';
import './Auth.scss';

class Auth extends Component {

  state = {
    isSigned: false
  };

  handleSignUp = () => {
    this.setState((prevState) => ({
      isSigned: true
    }));
  };

  handleSignIn = () => {
    this.setState((prevState) => ({
      isSigned: false
    }));
  };

  render() {
    const { isSigned } = this.state;
    const { handleSignUp, handleSignIn } = this;
    return (
      <>
        <div className={"Auth-wrap" + (isSigned ? " right-panel-active" : "")}>
          <SignUp />
          <SignIn />
          <Overlay
            onSignUp={handleSignUp}
            onSignIn={handleSignIn}
          />
        </div>
      </>
    );
  };
};

export default Auth;