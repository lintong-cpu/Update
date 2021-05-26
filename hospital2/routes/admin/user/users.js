var express=require('express');
const app = require('../../../app');

var router=express.Router();

var sqlQuery=require('../../../module/mysql')
//查找数据库

router.get('/',async(req,res)=>{
    let page=req.query.page
    page=page?page:1
    //查找语句
    let strsql='select * from adminuser limit ?,5'
    let result=await sqlQuery(strsql,[(parseInt(page)-1)])
    let options={
        userlist:Array.from(result)
    }
res.render('admin/users/userlist1.html',options)
})
router.post('/deluser',(req,res)=>{
    console.log(req.body);
  let delist=req.body['delist[]']//从ajax传过来的数据
  delist.forEach(async(item,i)=>{
  let strsql='delete from adminuser where id =?'
  await sqlQuery(strsql,item)
  })
  console.log(delist);
  res.json({
    state:'ok',
    content:'删除成功'
  })
  })
router.get('/api/userlist',(req,res)=>{
let page=req.query.page;//几页
let limit=req.query.limit//几行
})


module.exports=router;