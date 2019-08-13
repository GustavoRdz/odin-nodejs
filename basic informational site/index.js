var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var file = q.pathname.split(".")[0] // prevent to use "filename.html" of only "filename"
  var filename = file === '/' ? './index.html' : '.' + file + '.html'  // adding the .html
  var notFound = "./404.html";

  fs.readFile(filename, function(err, data) {
    if (err) {
       // render the 404 file 
      fs.readFile(notFound, function(err, data) {
        res.write(data);
        res.end()
      })
    } else {
      // render the other files (not 404)
      res.writeHead(200,{'Content-Type':'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);
