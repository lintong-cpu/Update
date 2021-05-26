//这个可以管理另外4个界面
var express = require('express');
var router = express.Router();
var userRouter=require('./userRouter');
var doctorRouter=require('./doctorRouter');
var newsRouter=require('./newsRouter')
var paientRouter=require('./paientRouter')
//判断是否符合条件进入
function permission(req,res,next){
  if(req.session.username==undefined){
    res.render('info/info.html',{
      title:'尚未登录',
      content:'请登录',
      href:'/enter/login',
  hrefTxt:'返回登录页面'
  
   })
  }else{
    next();
  }
}
/* GET users listing. */
router.get('/',permission, function(req, res, next) {
  res.render('admin/index.html')
});
//后台用户管理
router.use('/user',userRouter)
//后台新闻管理
router.use('/news',newsRouter)
//后台医生管理
router.use('/doctor',doctorRouter)
//后台患者管理
router.use('/paient',paientRouter)

module.exports = router;