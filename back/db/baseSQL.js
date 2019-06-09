const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')

class promiseSQL {
  constructor(){
    this.limit=false;
    this.offset=false;
    this.join=[];
    this.where=[];
    this.tempTables=[];
    this.params=[];
  }
  getSelect(){
    return '*'
  }
  getFrom(){
    return ''
  }
  getOrderBy(){
    return false;
  }
  getGroupBy(){
    return false;
  }
  getSQL(){
    var sql = 'SELECT ' + this.getSelect() + '\n';
    sql += 'FROM ' + this.getFrom() + '\n';

    this.join.forEach(function(item){
      sql += item.type + ' '  + item.tableName + ' ON ' + item.conditions + '\n'
    })

    if (this.where.length>0){
      sql += 'WHERE ';
      var needType=false;
      this.where.forEach(function(item){
        sql += (needType?item.type:'') + ' '  + item.condition + '\n'
        needType=true;
      })
    }
    var group;
    var order;
    if (group = this.getGroupBy()){
      sql += 'GROUP BY '+group
    }
    if (order = this.getOrderBy()){
      sql += 'ORDER BY '+order;
    }

    if (Boolean(!!this.limit)){
      sql+='\n LIMIT '+this.limit
    }
    if (Boolean(!!this.offset)){
      sql+=' OFFSET '+this.offset
    }

    return sql;
  }
  addJoin(table_name, conditions, type = 'JOIN'){
    this.join.push({
      type: type,
      tableName: table_name,
      conditions: conditions
    })
  }
  addLeftJoin(table_name, conditions){
    this.addJoin(table_name, conditions, 'LEFT JOIN');
  }
  addJoinWithArr(Arr, tableName, fieldName, refFieldName, dataType='uuid', type = 'JOIN'){
    this.tempTables.push(
      {
         Arr: Arr,
         tableName: tableName,
         fieldName: fieldName,
         refFieldName: refFieldName,
         dataType: dataType,
         type: type
      }
    )
  }
  initJoin(){

  }
  andWhere(condition){
    this.where.push({
      type: 'AND',
      condition: condition
    });
  }
  orWhere(){
    this.where.push({
      type: 'OR',
      condition: condition
    });
  }
  initWhere(){

  }
  setParams(params){

  }

  createTempTables(){
    if(this.tempTables.length===0) return;

    for(var i=0;i<this.tempTables.length;i++){
      var item=this.tempTables[i];
      var createTableText = "CREATE TEMP TABLE IF NOT EXISTS "+item.tableName+" ("+item.fieldName+" "+item.dataType+")";
      var insertSQL = "INSERT INTO " + item.tableName + "("+item.fieldName+") VALUES($1::"+item.dataType+")";
      this.client.query(createTableText, null, (err, res)=>{
        if(err)console.log('NOT CREATED', err)
      });

      for (var i=0;i<item.Arr.length;i++){
        this.client.query(insertSQL, [ item.Arr[i] ], (err, res)=>{
          if(err)console.log('NOT INSERTED', err)
        });
      }
      var alias = 'arr'+ Math.floor(Math.random() * 1000);
      var cnd = alias+'.'+item.fieldName+' = '+item.refFieldName;
      var tn = item.tableName+' '+alias;

      this.addJoin(tn, cnd, item.type);
    }
  }

  execute(resolve, reject){
    const db = require('./index');
    this.initJoin();
    this.initWhere();

    console.log('Execute report:', this.constructor.name);
    db.pool.connect((err, client, done) => {
      if (err) {
        console.log('Ошибка соединения\n');
        throw err
      }

      this.client = client
      this.createTempTables()
      let sql = this.getSQL()

      let params=[]
      let pidx=0;

      for (var key in this.params) {
        params.push(this.params[key]);
        pidx++;
        sql=sql.replace('$'+key, '$'+pidx);
      }

      console.log(sql);

      const query = new QueryStream(sql, params);
      const stream = client.query(query);

      stream.on('end', done);
      // res.resolve(stream)
      resolve(stream)
    })
  }
}

class baseSQL extends promiseSQL{

  execute(res){
    const self=this
    self.res = res

    super.execute(
      function(stream){
        stream.pipe(JSONStream.stringify()).pipe(self.res)
      },
      function(e){
        console.log(e)
      }
    )

  }
}

module.exports = {baseSQL, promiseSQL};
