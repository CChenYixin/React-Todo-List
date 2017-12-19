import React, {Component} from 'react';
import './App.css';
import TodoInput from './TodoInput';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            newTodo:"测试",
            todoList:[
                {id:1,title:'第一个待办事项'}
            ]
        }
    }

    render() {

        let todos = this.state.todoList.map((item,index)=>{
            return <li key={item.id}>{item.title}</li>
        })

        return (
            <div className = "App">
                <h1>我的待办事项</h1>
                <div className = "inputWrapper">
                    <TodoInput content="{this.state.newTodo}" />
                </div>
                <ol>
                    {todos}
                </ol>
            </div>
        );
    }
}

export default App;
