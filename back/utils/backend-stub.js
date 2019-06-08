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

  app.get('/api/ref/:ref', (req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin', '*'
    )
    const refName = req.params.ref;

  });

  app.post('/api/getdata', bodyParser.json(), (req, res) => {
    res.setHeader(
      'Access-Control-Allow-Origin', '*'
    )
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    //db.getReportData(req.body, res)
  });

  app.post('/auth', bodyParser.json(), (req, res) => {
    res.setHeader(
      'Access-Control-Allow-Origin', '*'
    )

    db.sqlAuth(req.body, res)
  });

  app.put('/auth', bodyParser.json(), (req, res) => {
    res.setHeader(
      'Access-Control-Allow-Origin', '*'
    )
    db.sqlReg(req.body, res)
  });
};
