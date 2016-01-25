var http = require('http');
var querystring = require('querystring');
var postData = querystring.stringify({
    'content': '来自centos测试环境的一句话' + new Date().toLocaleString(),
    'mid': 8837
});


var options = {
    hostname: 'www.imooc.com',
    port: 80,
    path: '/course/docomment',
    method: 'POST',
    hearders: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'imooc_uuid=a64331a3-b786-48e9-9bb3-93b690605484; imooc_isnew_ct=1447823432; IMCDNS=0; PHPSESSID=ukbjfaolf7cgoc2j8m0jgl8226; jwplayer.qualityLabel=è¶æ¸; loginstate=1; apsid=Q3NWM4OWMyMzAyZTcyNzIwN2UxYmQxMmFmNjU2YWIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTIwNTMzOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABza3liamZAMTI2LmNvbQAAAAAAAAAAAAAAAAAAAAAAADlkYjUyMDJlZDI5MjE3ZDBkNzgyMmY3ODQ2YzY1YWM1YuehVmLnoVY%3DMm; last_login_username=skybjf%40126.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1453285048,1453363498,1453371122,1453429950; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1453459959; cvde=56a195370ca34-82; imooc_isnew=2',
        'Host': 'www.imooc.com',
        'Origin': 'http://www.imooc.com',
        'Pragma': 'no-cache',
        'Referer': 'http://www.imooc.com/video/8837',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
    }
}


var req = http.request(options, function(res) {
    console.log('Status:' + res.statusCode);
    console.log('Status:' + JSON.stringify(res.hearders));

    res.on('data', function(chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });

    res.on('end', function() {
        console.log('评论完成！');
    });
})
req.on('error', function(e) {
    console.log('Error:' + e.message);
})
req.write(postData);
req.end();
