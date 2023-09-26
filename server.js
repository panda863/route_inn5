const http = require("http");
// const PORT = 8000;
// const html = require("fs").readFileSync("./index.html");
const fs = require("fs");

//webサーバーを作ろう
// const server = http.createServer((req,res)=>{
//ブラウザからアクセスがきた時の処理
//     res.writeHead(200,{"Content-Type":"text/html"});
//     res.write(html);
//     res.end();
// });
function getType(_url) {
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
  };
  for (const key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}

const server = http.createServer((req, res) => {
  const url =
    "public" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": getType(url) });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    // res.statusCode = 404;
    res.writeHead(200, { "Content-Type": getType(url) });
    res.end();
  }
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
