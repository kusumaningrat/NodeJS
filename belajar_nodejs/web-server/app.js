const http = require('http');
const fs = require('fs');

const port = 3000;

const renderHTML = (path,res) => {
    fs.readFile(path, (err,data) => {
        if(err){
            res.writeHead(404);
            res.write('Error: file not found');
        }else{
            res.write(data)
        };
        res.end()
    });
};

http
    .createServer((req,res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        
        const reqUrl = req.reqUrl;

        if(reqUrl === '/about'){
            res.write('<h1>About</h1>');
            res.end();
        }

    });
    http.Server.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
