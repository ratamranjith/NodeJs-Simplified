const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const BASE_DIR = path.join(os.homedir(), 'simple-text-editor-files');

// Ensure base directory exists
if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR);
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML file
        const filePath = path.join(__dirname, 'views', 'index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(filePath).pipe(res);
    } else if (req.method === 'POST' && req.url === '/save') {
        // Save file
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const filename = params.get('filename');
            const content = params.get('content');
            const filePath = path.join(BASE_DIR, filename);

            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error saving file');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File saved successfully');
                }
            });
        });
    } else if (req.method === 'GET' && req.url.startsWith('/read')) {
        // Read file
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
        const filename = urlObj.searchParams.get('filename');
        const filePath = path.join(BASE_DIR, filename);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/delete') {
        // Delete file
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const filename = params.get('filename');
            const filePath = path.join(BASE_DIR, filename);

            fs.unlink(filePath, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error deleting file');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File deleted successfully');
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
