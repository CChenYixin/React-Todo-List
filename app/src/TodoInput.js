import React, { Component } from 'react';

class TodoInput extends Component{
    render(){
        return <input type ="text" value={this.props.newTodo} />
    }
}

export default TodoInput