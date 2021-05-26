var express = require('express');
var router = express.Router();
var sqlQuery=require('../../module/mysql')
/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('login/register.html')
});
router.get('/login',(req,res,next)=>{
res.render('login/login.html')
})
router.post('/register',async(req,res)=>{//post前面已经自带了一个enter
let username=req.body.username;
let password=req.body.password;
//判断用户是否存在
let sql="select * from adminuser where username=?"
  let result=await sqlQuery(sql,[username])
  if(result.length!=0){//如果数据库能找到的话
    res.render('info/info.html',{
      title:'注册失败',
      content:'用户已存在',
      href:'/enter/register' ,
      hrefTxt:'返回注册页面'
       })
  }else{
    sql="insert into adminuser(username,password,role) values(?,?,1)"
   await sqlQuery(sql,[username,password])
  

  res.render('info/info.html',{
    title:'注册成功',
    content:'注册成功即将进入登录页面',
    href:'/enter/login',
hrefTxt:'登录页面'
  })
  }
})
router.post('/login',async(req,res)=>{
  let username=req.body.username;
  let password=req.body.password
let sql='select * from adminuser where username=? and username=?'
 let result=await sqlQuery(sql,[username,password])
 if(result.length!=0){
    req.session.username=username;
  res.render('info/info.html',{
    title:'登录成功',
    content:'即将跳转到后台管理页面',
    href:'/admin',
hrefTxt:'确定'
})


 
}else{
  res.render('info/info.html',{
    title:'登录失败',
    content:'用户名或者密码错误',
    href:'/enter/login',
  hrefTxt:'返回登录页面'
})
}
})
module.exports=router;