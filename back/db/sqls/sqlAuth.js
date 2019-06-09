const {baseSQL, promiseSQL} = require('../baseSQL')
const md5 = require('md5')
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')

class sqlAuth extends baseSQL {

  getFrom(){
    return 'users'
  }

  initWhere(){
    this.andWhere('pass=$pass');
    this.andWhere('login=$name');
  }

  setParams(params){
    console.log(params);
    if(params.name!=undefined){
      this.params['name']=params.name
    }

    if(params.pass!=undefined){
      this.params['pass']=md5(params.pass)
    }
  }

  execute(res){
    this.initJoin()
    this.initWhere()
    const db = require('../index');
    console.log('Execute report:', this.constructor.name);
    db.pool.connect((err, client, done) => {
      if (err) {
        console.log('Ошибка выполнения\n', sql, '\n', params);
        throw err
      }

      this.client = client

      let sql = this.getSQL()

      let params=[]
      let pidx=0;

      for (var key in this.params) {
        params.push(this.params[key]);
        pidx++;
        sql=sql.replace('$'+key, '$'+pidx);
      }

      client.query(sql, params)
        .then(result => {
          console.log(result)
          if (result.rows.length > 0){
            global.req.session.user = result.rows[0].id
            res.setHeader(
              'Content-Type', 'application/json; charset=utf-8'
            )
            res.status(200)
            res.json(result.rows)
            // res.json(result.rows)
          } else {
            res.setHeader(
              'Content-Type', 'application/json; charset=utf-8'
            )
            res.status(401)
            res.json("Пользователь не найден")
          }
        })
        .catch(e => {
          res.setHeader(
            'Content-Type', 'application/json; charset=utf-8'
          )
          res.status(401)
          res.json("Пользователь не найден")
        })
        .then(() => client.end())

    })
  }

}

class sqlPromiseUsers extends promiseSQL {
  getFrom(){
    return 'users'
  }

  initWhere(){
    this.andWhere('name<=$name');
  }

  setParams(params){
    console.log(params);
    if(params.name!=undefined){
      this.params['name']=params.name
    }

  }
}

class sqlPromiseCompanyByINN extends promiseSQL {
  getFrom(){
    return 'companies'
  }

  initWhere(){
    this.andWhere('inn<=$inn');

    this.andWhere('status=$status');
  }

  setParams(params){
    console.log(params);

    if(params.inn!=undefined){
      this.params['inn']=params.inn
    }

    if(params.status!=undefined){
      this.params['status']=params.status
    }

  }
}

class sqlReg {

  constructor(){
    this.limit=false;
    this.offset=false;
    this.join=[];
    this.where=[];
    this.tempTables=[];
    this.params=[];
  }

  getSQL(){
    return 'users'
  }

  setParams(params){
    console.log(params);
    if(params.name!=undefined){
      this.params['name']=params.name
    }

    if(params.pass!=undefined){
      this.params['pass']=md5(params.pass)
    }
    if(params.login!=undefined){
      this.params['login']=params.login
    }
    if(params.type!=undefined){
      this.params['type']=params.type
    }
  }

  getCompany(){
    var self = this
    if (this.params.inn != undefined){
      return Promise((resolve, reject) => {
        let sqlCompany = new sqlPromiseCompanyByINN()
        sqlCompany.setParams(self.params)
        sqlCompany.execute(resolve, reject)
      })
    } else {
      return Promise.resolve({rows: []})
    }
  }

  getCheckUser(){
    return new Promise((resolve, reject) => {
      let sqlUsers = new sqlPromiseUsers()
      sqlUsers.setParams(this.params)
      sqlUsers.execute(resolve, reject)
    })
  }

  checkUserRes(stream){
    const rows = stream.cursor._result.rows || []

      if (rows.length > 0){
        this.res.setHeader(
          'Content-Type', 'application/json; charset=utf-8'
        )
        this.res.status(403)
        this.res.json("Пользователь уже зарегитрирован")
        return false
      }
      return true
  }

  sendSMS(to, msg){

    let url = 'https://sms.ru/sms/send?api_id=5f93e20b-3767-5564-b99f-6380e59be1ee&to='+to+'&msg='+msg+'&json=1'

    const https = require('https')

    https.get(url, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);

        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });


  }

  validateSMS(){

  }

  writeOk(stream){

    this.res.setHeader(
      'Content-Type', 'application/json; charset=utf-8'
    )
    this.res.status(200)
    this.res.json("Пользователь зарегитрирован")
  }

  saveUser(name, login, pass, role, company, type){
    const db = require('../index');
    db.pool.connect((err, client, done) => {

        client.query(
            'INSERT into users (name, login, pass, role, company, type) VALUES($1, $2, $3, $4::uuid, $5::uuid, $6::uuid) RETURNING id',
            [name, login, pass, role, company, type],
            function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('row inserted with id: ' + result.rows[0].id);
                }

            })
    })

  }

   insertCompany(inn, callback){
    const db = require('../index');
    db.pool.connect((err, client, done) => {

        client.query(
            'INSERT into companies (inn) VALUES($1) RETURNING id',
            [inn],
            callback(err, result)
          )
        })
  }

  async execute(res){
    let checkUser = this.getCheckUser()
    let pCompany = this.getCompany()
    var self = this
    let usrChecked
    let companyId=false
    let smsCode
    this.res = res

    Promise.all([checkUser, pCompany]).then(values => {

      usrChecked = self.checkUserRes(values[0])
      if (!usrChecked) {
        return false
      }

      if (values[1].rows.length > 0) {
        companyId = values[1].rows[0].id
      } else {
        if (self.params.inn != undefined)
          companyId= self.insertCompany(self.params.inn, function(err, result) {
              if (!err)
               companyId = result.rows[0].id;
          })
      }

      smsCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000 +'';
      let smsMsg = encodeURI('Password: '+smsCode)

      self.sendSMS(self.params.login, smsMsg)
      self.saveUser(
        self.params.name, self.params.login, md5(smsCode), '9797cc63-b4a9-3e50-e5a7-bcbb243e3c3b',
          (companyId)?companyId:null,
          (self.params.type===1)?'99ab75a0-8559-cb9f-e271-bf3cbb00b59d':'938c2ca7-4d68-d22e-ad2e-efc4c25eda1d',

      )
      self.writeOk()

    })


  }

}

module.exports = {sqlAuth, sqlReg};
