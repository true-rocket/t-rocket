const {baseSQL, promiseSQL} = require('../baseSQL')
const md5 = require('md5')
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')

class sqlCompaines extends baseSQL {
  getFrom(){
    return 'companies c'
  }

  initJoin(){
    this.addJoin('users u', 'c.id = u.company');
  }

  initWhere(){
    this.andWhere('u.id>=$user_id');
  }

  setParams(params){
    console.log(global.user);
    // req.session.user = res
    // this.params['user_id']=md5(params.pass)
  }
}

class sqlVorders extends baseSQL {
  getFrom(){
    return '"Vorders"'
  }

  initWhere(){
    this.andWhere('user_contractor>=$user_id');
  }

  setParams(params){
    console.log(global.user);
    this.params['user_id']='07ae8c9c-9c13-a28f-83b8-59274a591b71'
  }
}

class sqlVroutes extends baseSQL {
  getFrom(){
    return '"Vroutes"'
  }

  // initWhere(){
  //   this.andWhere('user_contractor>=$user_id');
  // }
  //
  // setParams(params){
  //   console.log(global.user);
  //   this.params['user_id']='07ae8c9c-9c13-a28f-83b8-59274a591b71'
  // }
}

class sqlVUsers extends baseSQL {
  getFrom(){
    return '"Vusers"'
  }

  initWhere(){

  }

  setParams(params){

  }
}

class sqlVPayments extends baseSQL {
  getFrom(){
    return '"Vpayments"'
  }

  initWhere(){

  }

  setParams(params){

  }
}

module.exports = {sqlVorders, sqlVroutes, sqlVPayments, sqlVUsers};
