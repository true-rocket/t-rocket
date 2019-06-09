// const { generateData, generateDetails } = require('./generate-data');
// const data = generateData();
// const cache = {};
const db = require('../db')

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
};
