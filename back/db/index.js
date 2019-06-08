const { Pool, Client } = require('pg')
const connectionString = 'postgresql://admin:@123admin@91.240.87.125:5432/trocket'

const repData = require('./repData')
const {sqlAuth,sqlReg} = require('./sqls/sqlAuth')


const pool = new Pool({
  connectionString: connectionString,
})

module.exports = {
  asyncGetClient: async () => {
    return await pool.connect();
  },
  pool,
  query: (text, params, callback) => {
    //return pool.query(text, params, callback)
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('executed query', { text, duration/*, rows: res.rowCount*/ })
      callback(err, res)
    })
  },

  getReportData: (params, res) => {
    rep = params.report;
    repData[rep](params, res);
  },

  sqlAuth: (params, res) => {
    let sql = new sqlAuth()
    sql.setParams(params)
    sql.execute(res)
  },

  sqlReg: (params, res) => {
    let sql = new sqlReg()
    sql.setParams(params)
    sql.execute(res)
  }

}
