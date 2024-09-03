const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    res.setHeader('Content-type', 'text/html');
    if (url == "/") {
        res.write(`
            <html>
            <head>
            <title>My First Page</title>
            </head>
            <body>
            <h1>Hello World!</h1>
            <form  enctype="multipart/form-data"  action="/message" method="POST">
            <input type="text" name="message" placeholder="Enter your message"/>
            <input type="file" name="file" />
            <button type="submit" >Upload</button>
            </body>
            </html>
            `);
        return res.end();
    }
    if (url == "/message") {
        req.on('data', (chunks) => {
            console.log('Chunk :=> ' + chunks);
        })
        fs.writeFileSync('sample.txt', data);
        res.setHeader('Location', "/");
        res.statusCode = 302;
        return res.end();
    }
});

server.listen(3000);