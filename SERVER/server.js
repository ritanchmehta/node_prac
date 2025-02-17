const http =require("http");
const fs = require("fs");
const path = require("path"); 


//do not use preused ports like port: 80,22,443
const port = 3000;

const server = http.createServer((req, res)=>{
    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url); //__dirname gives you the absolute path of the file

    console.log(filePath);

    const extName = String(path.extname(filePath).toLowerCase());

    //specifies what type of files are supported
    const mimeTypes ={
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
        '.png' : 'text/png'
    }

    const contentType= mimeTypes[extName] || 'application/octet-stream' //octet-stream it is a generic file

    fs.readFile(filePath, (err,content)=> {
        if(err){
            if(err.code === "ENOENT"){
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end("404: File not Found");
            }
        }
        else{
            res.writeHead(200, {'Content-type': contentType})
                res.end(content, 'utf-8');
        }
    });
})

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})