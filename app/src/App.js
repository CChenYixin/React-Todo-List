import React, { Component } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser,signOut,TodoModel} from './leanCloud';
import 'normalize.css';
import './reset.css';
import './App.css';
import { Button } from 'antd';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }

    this.addTodo = this.addTodo.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
    this.toggle = this.toggle.bind(this)
    this.delete = this.delete.bind(this)
    this.signOut = this.signOut.bind(this)


    this.initTodoGetByUser()

    

  }

  initTodoGetByUser(){
    let user = getCurrentUser()
    if(user){
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state)) 
    stateCopy.user = user
    this.setState(stateCopy)
  }

  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    stateCopy.newTodo = '';
    stateCopy.todoList = [];
    this.setState(stateCopy)
  }


  addTodo(event){
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })}, (error) => {
          console.log(error)
        })
    }

  delete(event,todo){
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }

  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList:this.state.todoList
    })
  }
  
  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }




  render() {
    let todos = this.state.todoList
    .filter((item)=> !item.deleted)
    .map( (item,index) =>{
      return (
        <li key={index}>
          <TodoItem todo={item} 
            onToggle={this.toggle} 
            onDelete={this.delete}
          />
        </li>
      )
    })


    return (
      <div className='App'>
        <h1> 
          {this.state.user.username ||'MY'} TODO LIST
          {this.state.user.id ? <Button onClick={this.signOut}>登出</Button> : null}
        </h1>
        <div className='inputWrapper'>
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle}          
            onSubmit={this.addTodo}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
          {this.state.user.id ? null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)} 
            onSignIn={this.onSignUpOrSignIn.bind(this)}
            todoInit={this.initTodoGetByUser.bind(this)}
          />}
      </div>
    )
  }

}

export default App;

// let id = 0

// function idMaker(){
//   id += 1
//   return id
// }