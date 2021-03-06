import AV from 'leancloud-storage';


var APP_ID = 'wRA74lYQbF7jvLRwsOMuEl5K-gzGzoHsz'
var APP_KEY = '8ckl6ljBeTFli8kqw9CwshSg'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

// TODO创建更新删除

export const TodoModel = {

  getByUser(user, successFn, errorFn){
     let query = new AV.Query('Todo')
     query.equalTo('deleted', false)
     query.find().then((response) => {
       let array = response.map((t) => {
         return {id: t.id, ...t.attributes}
       })
       successFn.call(null, array)
     }, (error) => {
       errorFn && errorFn.call(null, error)
     })
   },

  create({status, title, deleted}, successFn, errorFn){
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()

    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)

    // 设置权限
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) 
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    todo.setACL(acl)



    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    })
  },

  update({id, title, status, deleted}, successFn, errorFn){
    let todo = AV.Object.createWithoutData('Todo', id)

    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)

    todo.save().then((response) => {
      successFn && successFn.call(null)
    }, (error) => errorFn && errorFn.call(null, error))

  },

  destroy(todoId, successFn, errorFn){
    TodoModel.update({id: todoId, deleted: true}, successFn, errorFn)
  }



}



// 注册

export function signUp(email,username,password,successFn,errorFn){

  var user = new AV.User()

  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)

  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function (error){
    errorFn.call(null,error)
  })

  return undefined
}

// 登陆

export function signIn(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}

// 载入当前用户

export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

//登出

export function signOut(){
  AV.User.logOut()
  return undefined
}

//忘记密码

export function sendPasswordResetEmail(email, successFn, errorFn){
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call() 
  }, function (error) {
    errorFn.call(null, error)
  })
}


function getUserFromAVUser(AVUser){
    return{
      id :AVUser.id,
      ...AVUser.attributes
    }
}