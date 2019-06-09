const {baseSQL, promiseSQL} = require('../baseSQL')
const md5 = require('md5')
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')

class ins_order {

  execute(params, res){

    const db = require('../index');
    db.pool.connect((err, client, done) => {

        client.query(
          'INSERT into orders (price, weight, lenght, height, width, user_customer, status_order, status_payment) \n'+
            'VALUES($1, $2, $3, $4,$5,$6::uuid,$7,$8) RETURNING id',
            [params.price, params.weight, params.lenght, params.height, params.width,
              '91d8002b-c32c-11aa-bf9e-2a8fa1cca31d', //params.user_customer,
               params.status_order, params.status_payment],
            function(err, result) {
                if (err) {
                    res.setHeader(
                      'Content-Type', 'application/json; charset=utf-8'
                    )
                    res.status(500)
                    res.json(result.rows)
                } else {
                  res.setHeader(
                    'Content-Type', 'application/json; charset=utf-8'
                  )
                  res.status(200)
                  res.json(result.rows)
                }

            })
      })
    }
}

class upd_order {

  execute(params, res){

    const db = require('../index');
    db.pool.connect((err, client, done) => {

        client.query(
          'UPDATE orders \n'+
            ' SET price=$1,\n'+
            '     weight=$2,\n'+
            '     lenght=$3,\n'+
            '     height=$4,\n'+
            '     width=$5,\n'+
            '     user_customer=$6::uuid,\n'+
            '     status_order=$7,\n'+
            '     status_payment=$8 \n'+
            'WHERE id=$9',
            [params.price, params.weight, params.lenght, params.height, params.width,
              '91d8002b-c32c-11aa-bf9e-2a8fa1cca31d', //params.user_customer,
               params.status_order, params.status_payment],
            function(err, result) {
                if (err) {
                    res.setHeader(
                      'Content-Type', 'application/json; charset=utf-8'
                    )
                    res.status(500)
                    res.json(result.rows)
                } else {
                  res.setHeader(
                    'Content-Type', 'application/json; charset=utf-8'
                  )
                  res.status(200)
                  res.json(result.rows)
                }

            })
    })
}
}

class ins_route {

  execute(params, res){

    const db = require('../index');
    db.pool.connect((err, client, done) => {

        client.query(
          'INSERT into routes (contractor_user, point_a, point_b, status, date) \n'+
            'VALUES($1, $2, $3, $4,$5) RETURNING id',
            [params.contractor_user, params.point_a, params.point_b, params.status, params.date],
            function(err, result) {
                if (err) {
                    res.setHeader(
                      'Content-Type', 'application/json; charset=utf-8'
                    )
                    res.status(500)
                    res.json(result.rows)
                } else {
                  res.setHeader(
                    'Content-Type', 'application/json; charset=utf-8'
                  )
                  res.status(200)
                  res.json(result.rows)
                }

            })
      })
    }
}

class upd_route {

  execute(params, res){

    const db = require('../index');
    db.pool.connect((err, client, done) => {

        client.query(
          'UPDATE routes \n'+
            ' SET contractor_user=$1::uuid,\n'+
            '     point_a=$2,\n'+
            '     point_b=$3,\n'+
            '     status=$4,\n'+
            '     date=$5 \n'+
            'WHERE id=$6',
            [params.contractor_user, params.point_a, params.point_b, params.status, params.date, params.id],
            function(err, result) {
                if (err) {
                    res.setHeader(
                      'Content-Type', 'application/json; charset=utf-8'
                    )
                    res.status(500)
                    res.json(result.rows)
                } else {
                  res.setHeader(
                    'Content-Type', 'application/json; charset=utf-8'
                  )
                  res.status(200)
                  res.json(result.rows)
                }

            })
    })
}
}

module.exports = {ins_order, upd_order, ins_route, upd_route};
