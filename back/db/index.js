const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:tm@192.168.38.215:5432/Horizon_RTLS'
const repData = require('./repData')
const pool = new Pool({
  connectionString: connectionString,
})
const out_guid='ffffffff-ffff-ffff-ffff-ffffffffffff'

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
  
  out_guid: out_guid,

  getReportData: (params, res) => {
    rep = params.report;
    repData[rep](params, res);
  }

}
