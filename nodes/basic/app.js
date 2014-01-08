var port = 7077;
 
var http = require("http");
var path = require("path"); 
var fs = require("fs");     
 
console.log("Starting web server at port: " + port);
 
http.createServer( function(req, res) {
 
  var filename = req.url || "index.html";
  var ext = path.extname(filename);
  var localPath = __dirname+"/views";
  var validExtensions = {
    ".html" : "text/html",      
    ".jpg": "image/jpeg",
  };
  var isValidExt = validExtensions[ext];

  if (isValidExt) {
    
    localPath += filename;
    path.exists(localPath, function(exists) {
      if(exists) {
        console.log("Serving file: " + localPath);
        getFile(localPath, res, ext);
      }
      else if(req.url === '/cars/new.html')
      {
        fs.readFile('views/new.html', 'utf8', function (errors, contents){
          res.write(contents); 
          res.end();
        });
      }
      else {
        console.log("File not found: " + localPath);
        res.writeHead(404);
        res.end();
      }
    });
 
  } else {
    console.log("Invalid file extension detected: " + ext)
  }
 
}).listen(port);
 
function getFile(localPath, res, mimeType) {
  fs.readFile(localPath, function(err, contents) {
    if(!err) {
      res.setHeader("Content-Length", contents.length);
      res.setHeader("Content-Type", mimeType);
      res.statusCode = 200;
      res.end(contents);
    }
    else {
      res.writeHead(500);
      res.end();
    }
  });
}