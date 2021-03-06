// const { generateData, generateDetails } = require('./generate-data');
// const data = generateData();
// const cache = {};
const db = require('../db')
const { hereapi } = require('./hereapi');

exports.initBackendStub = function(app, server) {
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
                  extended: true
              }));

  let session = require('express-session')

  app.use(session({
      secret: 'tRoc2C44-4D44-WppQ38Siuyiuy',
      cookie: {
        originalMaxAge: 2592000
      },
      resave: true,
      saveUninitialized: true
  }));

  app.get('/api/:ref', (req, res, next) => {
    global.user = req.session.user

    const refName = req.params.ref;
    db[refName](req.body, res)

  });

  app.put('/api/:ref', (req, res, next) => {
    global.user = req.session.user

    const refName = 'ins_'+req.params.ref;
    db[refName](req.body, res)

  });

  app.post('/api/:ref', (req, res, next) => {
    global.user = req.session.user

    const refName = 'upd_'+req.params.ref;
    db[refName](req.body, res)

  });

  app.post('/api/getdata', bodyParser.json(), (req, res) => {

    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    //db.getReportData(req.body, res)
  });

  app.post('/auth', bodyParser.json(), (req, res) => {
    global.req = req
    db.sqlAuth(req.body, res)
  });

  app.put('/auth', bodyParser.json(), (req, res) => {

    db.sqlReg(req.body, res)
  });

  app.get('/completeroute/:id', (req, res, next) => {
    const routeId = 'upd_'+req.params.id;

    new Promise((resolve, reject) => {
      let adrFrom = [
        'Санкт-Перебург, аллея Котельников, 20',
        'Санкт-Перебург, ул Парашютная, 4',
        'Санкт-Перебург, пр Ленински, 51',
      ]
      let adrTo = [
        'Ленинградская область, Тихвин, Коммунаров, 18',
        'Москва, Поречная улица, 9',
        'село Молоково, Ленинский район, Московская область, Прудищинская улица, 81',
      ]


    }).then(function(value){

    })

  });

};
