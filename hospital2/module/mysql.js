//封装一个mysql
let mysql=require('mysql');
let options={
    host:"localhost",
    user:"root",
    password:"123456",
    database:'hospital'
}
let con=mysql.createConnection(options);
con.connect((err)=>{
if(err){
    console.log(err);
}else{
    console.log('连接成功');
}
})
function sqlQuery(strsql,arr){
 return new Promise((resolve,reject)=>{
  con.query(strsql,arr,(err,result)=>{
      if(err){
          reject(err)
      }else{
          resolve(result)
      }
  })
 })
}
module.exports=sqlQuery//把这个异步函数导出