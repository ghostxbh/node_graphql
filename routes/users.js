var express = require('express');
var router = express.Router();
const http = require('http');


/* GET users listing. */
router.get('/', function (req, res, next) {
    let url = 'http://127.0.0.1:55032';
    let method = 'GET';
    let bodydata = '测试';
    let callBackFunction = {};
    let cookie = req.cookies;
    nodePostGetRequest(url, method, bodydata, callBackFunction, cookie);
});

function nodePostGetRequest(url, method, bodydata, callBackFunction, cookie) {
    //把将要发送的body转换为json格式
    var body = bodydata;
    var bodyString = JSON.stringify(body);
    //http 头部
    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length,
        'Cookie': cookie
    };

//用与发送的参数类型
    var options = {
        method: method, //get方式或post方式
        headers: headers
    };

    var req = http.request(url, options, function (res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            //这里接收的参数是字符串形式,需要格式化成json格式使用
            //var resultObject = JSON.parse(responseString);
            console.log('-----resBody-----', responseString);
        });

        req.on('error', function (e) {
            // TODO: handle error.
            console.log('-----error-------', e);
        });
    });
    req.write(bodyString);
    req.end();
}

module.exports = router;
