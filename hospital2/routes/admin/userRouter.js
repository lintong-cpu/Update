var express = require('express');
const sqlQuery = require('../../module/mysql');
let multer=require('multer');
const fs = require('fs');
let upload=multer({dest:'./public/upload'})

var router = express.Router();
var userlistRouter=require('./user/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('用户管理');
});
router.get('/selfinfo',async(req,res)=>{
let username=req.session.username;
let sqlStr='select * from adminuser where username= ?';
let result=await sqlQuery(sqlStr,[username])
let users=result[0]
let roles=await getroles();
let options={users,roles};
res.render('admin/users/selfinfo.html',options)
})
router.post('/selfimg',upload.single('test1'),async(req,res)=>{
  let username=req.session.username
let result=rename(req);
let strsql='update adminuser set imgheader = ? where username = ?';
await sqlQuery(strsql,[result.imgurl,username])
res.json(result)

})
function rename(req){
  console.log(req.file);
let oldpath=req.file.destination+'/'+req.file.filename;
let newpath=req.file.destination+'/'+req.file.filename+req.file.originalname
fs.rename(oldpath,newpath,()=>{
  console.log('改名成功');
})
return {
  state:'ok',
  imgurl:'/upload/'+req.file.filename+req.file.originalname
}
}
async function getroles(){
  let sqlstr='select * from role';
  let result =await sqlQuery(sqlstr);
  return Array.from(result)
}
router.post('/selfinfo',async(req,res)=>{
console.log(req.body);
let username=req.session.username;
let strsql='update adminuser set password=?,email=?,phone=?,role=? where username =?';
let arr=[req.body.password,req.body.email,req.body.phone,req.body.role,username]
await sqlQuery(strsql,arr)
res.json({
  state:'ok',
  content:'个人信息更新成功'
})
})


router.use('/userlist1',userlistRouter);

module.exports = router;