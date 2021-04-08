const http = require('http')
const DB = require('./db');
const db = new DB('./notes.json');

const host = 'localhost';
const port = 8080;

const requestListener = (req, res) => {
    const {method, url} = req
    const [, smth, id] = url.split('/')
    switch (smth) {
        case "notes":
            if (method === 'GET') {
                const data = id ? db.get(id): db.get()
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(JSON.stringify(data));
            } else if (method === 'POST'){
                let data = ''
                req.on('data', (chunk)=>{
                    data += chunk
                })
                req.on('end', ()=> {
                    // data += chunk
                    const bodyString = Buffer.from(data).toString('utf-8')
                    const body = JSON.parse(bodyString)
                    const addedNote = db.add(body)
                    if (addedNote) {
                        res.statusCode = 201
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify(addedNote))
                    } else {
                        res.statusCode = 500
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify({message: 'Ups something wrong'}))
                    }
                })

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
