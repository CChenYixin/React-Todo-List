import React,{ Component } from 'react';
import { Input } from 'antd';

export default class TodoInput extends Component {

  constructor(props){
    super(props)

    this.submit = this.submit.bind(this)
    this.changeTitle = this.changeTitle.bind(this)

  }


  submit(e){
    if(e.key === 'Enter'){
      if(e.target.value.trim() !== ''){
        this.props.onSubmit(e)
        e.target.value = ''
      }
    }
  }
  changeTitle(e){
    this.props.onChange(e)
  }

  render(){
    return <Input type='text' placeholder="Please input"
      defaultValue={this.props.content}
      onChange={this.changeTitle}
      onKeyPress = {this.submit}
    />
  }



}