import React, {Component} from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { Radio } from 'antd';

export default class SignInOrSignUp extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selected: 'signUp'
    }

    this.switch = this.switch.bind(this)
  }

  switch (e) {
    this.setState({
      selected: e.target.value
    })
  }

  render(){
    return(
      <div className="signInOrSignUp">
      <nav>
        <label>
          <Radio  value="signUp" 
            checked={this.state.selected === 'signUp'}
            onChange={this.switch}
          > 注册 </Radio>
        </label>
        <label>
          <Radio  value="signIn" 
            checked={this.state.selected === 'signIn'}
            onChange={this.switch}
          > 登录
          </Radio>
          </label>
      </nav>
      <div className="panes">
        {this.state.selected === 'signUp' ? 
          <SignUpForm formData={this.props.formData}
          onSubmit={this.props.onSignUp}
          onChange={this.props.onChange}
          />
        : null}
        {this.state.selected === 'signIn' ? 
        <SignInForm formData={this.props.formData}
          onSubmit={this.props.onSignIn}
          onChange={this.props.onChange}
          onForgotPassword={this.props.onForgotPassword}
        /> 
        : null}
      </div>
    </div>
    )
  }




}

