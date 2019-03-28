var express = require('express');
var router = express.Router();
const request  = require('request');
const config = require('../../config');
router.post('/getOpenid',function (req,res) {
	var data =  req.body;
	var code = data.code;
	var appid = config.appid;
	var secret = config.secret;
	var src = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
	request(src, function(err, response, body){
		if(!err && response.statusCode == 200){
			if(body){
				console.log(body)
						// body = querystring.parse(body);
						body = eval("("+body+")")
						// console.log(body)
						res.send(body);
					}		
				}else{
					res.send('请求失败')
				}
			})
	// body...
})
router.get('/test',function(req,res){
	res.send('1')
})
module.exports = router;