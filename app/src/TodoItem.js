import React, { Component } from 'react';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import './TodoItem.css';

export default class TodoItem extends Component{
  constructor(props){
    super(props)

    this.toggle = this.toggle.bind(this)
    this.delete = this.delete.bind(this)
  }

  toggle(e){
    this.props.onToggle(e,this.props.todo)
  }
  delete(e){
    this.props.onDelete(e,this.props.todo)
  }


  render(){
    return(
      <div className='items'>
        <Checkbox checked={this.props.todo.status === 'completed'}
          onChange = {this.toggle}
        ></Checkbox>
        <p>{this.props.todo.title}</p>
        <Button type='danger' onClick = {this.delete}> 删除 </Button>
      </div>
    )
  }


}