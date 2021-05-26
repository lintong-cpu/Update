var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req,res)=>{
  res.render('admin/index2.html')
})

module.exports = router;
