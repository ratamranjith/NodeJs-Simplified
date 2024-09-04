// Handling URL based data
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    // request mechanism
    const url = req.url;
    const method = req.method;

    if (url == '/') {

        res.getHeader('Content-type', "text/html");
        res.write(`
            <html>
            <head>
            <title>Welcome</title>
            </head>
            <body>
            <h1>Home Page</h1>
            <form action="/message" method="POST">
            <input type="text" placeholder="Enter data" name="message"/>
            <button type="submit">Request Here</button>
            </form>
            </body>
            </html>
            `)
        return res.end()
    }
    else if (url == '/message') {
        req.on('data', (chunks) => {
            console.log("Chunks :=> ", chunks);
        });
        req.on('end', (err) => {
            console.log("Completed");

            if (err) {
                console.log(err);
            }
        })
    }
});

// Different ways to export
//1. module.exports = server;
//2. exports = server;
//3. module.exports = {server: server};
//4. exports.server = server;
module.exports = server;