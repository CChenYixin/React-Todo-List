import React from 'react';
import { Input } from 'antd';

export default function(props){
  return(
    <form className="signIn" onSubmit={props.onSubmit.bind(this)}>
      <div className="row">
        <label>用户名</label>
        <Input size="small" type="text"
          value={props.formData.username}
          onChange={props.onChange.bind(this,'username')}
        />
      </div>
      <div className="row">
        <label>密码</label>
        <Input size="small" type="password"
          value={props.formData.password}
          onChange={props.onChange.bind(this,'password')}
        />
      </div>
      <div className="row actions">
        <button type="submit">登录</button>
        <a href="#" onClick={props.onForgotPassword.bind(this)}>忘记密码了？</a>
      </div>
    </form>
  )
}