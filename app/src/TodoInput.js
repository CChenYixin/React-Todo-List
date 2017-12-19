import React, { Component } from 'react';
import './TodoInput.css';

class TodoInput extends Component{
    render(){
        return <input type ="text"
            className="TodoInput"
            value={this.props.content}
            onChange={this.changeTitle.bind(this)}
            onKeyPress={this.submit.bind(this)}/>
    }
    submit(e){
        if(e.key === 'Enter'){
            this.props.onSubmit(e);
        }
    }
    changeTitle(e){
        this.props.onChange(e);
    }

}

export default TodoInput
