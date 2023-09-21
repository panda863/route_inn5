const http = require("http");
const PORT = 8000;
const html = require("fs").readFileSync("./index.html");

//webサーバーを作ろう
const server = http.createServer((req,res)=>{
    //ブラウザからアクセスがきた時の処理
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(html);
    res.end();
});

const port = process.env.PORT || 8000;
server.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
});
