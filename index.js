const http = require('http')
const DB = require('./db');
const db = new DB('./notes.json');

const host = 'localhost';
const port = 8080;

const requestListener = ({method, url}, res) => {
    const [, smth, id] = url.split('/')
    switch (smth) {
        case "notes":
            if (method === 'GET') {
                const data = id ? db.get(id): db.get()
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(JSON.stringify(data));
            }
            break
        default:
            res.writeHead(200)
            res.end('RAQ')
            break;
    }
}

const server = http.createServer(requestListener);

server.listen(port, host, (error) => {
    if (error) {
        console.log('RAQ', error)
    } else {
        console.log(`Is happening something great on port ${port}...`)
    }
})
