const { Pool, Client } = require('pg')
const connectionString = 'postgresql://admin:@123admin@91.240.87.125:5432/trocket'

const repData = require('./repData')
const {sqlAuth,sqlReg} = require('./sqls/sqlAuth')
const {sqlVorders, sqlVroutes, sqlVPayments, sqlVUsers} = require('./sqls/sqlTables')
const {ins_order, upd_order} = require('./sqls/dmlOrders')


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
  },

  vorders: (params, res) => {
    let sql = new sqlVorders()
    sql.setParams(params)
    sql.execute(res)
  },
  vroutes: (params, res) => {
    let sql = new sqlVroutes()
    sql.setParams(params)
    sql.execute(res)
  },
  vpayments: (params, res) => {
    let sql = new sqlVpayments()
    sql.setParams(params)
    sql.execute(res)
  },
  vusers: (params, res) => {
    let sql = new sqlVUsers()
    sql.setParams(params)
    sql.execute(res)
  },
  ins_order: (params, res) => {
    let sql = new ins_order()
    sql.execute(params, res)
  },
  upd_order: (params, res) => {
    let sql = new upd_order()

    sql.execute(params, res)
  }

}
