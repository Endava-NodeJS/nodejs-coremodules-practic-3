const express = require('express');
const app = express();
const DB = require('./db');
const bodyParser = require('body-parser');


(async () => {
    const db = await DB.initDb('./db/database.db');
    const port = 8080;
app.use(bodyParser.json());
app.get('/notes/:id', async function(req, res) {
    const{params: {id}} = req;
    res.setHeader('Content-Type', 'application/json');
if(!id){
    res.status(400);
    return res.send("Id must be provided")
}
try {
    const note = await db.get('SELECT title, content, id FROM todo WHERE id=?', id);
    if(!note){ res.status(404);
        console.error("Entity not found");
        res.send("Entity not found");
    } else { 
        res.status(200);
        res.send(JSON.stringify(note));}
}
  catch(error){
    res.status(404);
      console.error(error);
      res.send(error.message);
  }  
  });

// const requestListener = (req, res) => {
//     const {method, url} = req
//     const [, smth, id] = url.split('/')
//     switch (smth) {
//         case "notes":
//             if (method === 'GET') {
//                 const data = id ? db.get(id) : db.get()
//                 res.setHeader("Content-Type", "application/json");
//                 res.writeHead(200);
//                 res.end(JSON.stringify(data));
//             } else if (method === 'POST') {
//                 let data = ''
//                 req.on('data', (chunk) => {
//                     data += chunk
//                 })
//                 req.on('end', () => {
//                     const bodyString = Buffer.from(data).toString('utf-8')
//                     const body = JSON.parse(bodyString)
//                     const addedNote = db.add(body)
//                     if (addedNote) {
//                         res.statusCode = 201
//                         res.setHeader("Content-Type", "application/json");
//                         res.end(JSON.stringify(addedNote))
//                     } else {
//                         res.statusCode = 500
//                         res.setHeader("Content-Type", "application/json");
//                         res.end(JSON.stringify({message: 'Ups something wrong'}))
//                     }
//                 })

//             } else if (method === 'PUT') {
//                 let data = ''
//                 req.on('data', (chunk) => {
//                     data += chunk
//                 })
//                 req.on('end', () => {
//                     const bodyString = Buffer.from(data).toString('utf-8')
//                     const body = JSON.parse(bodyString)
//                     const addedNote = db.update({id, ...body})

//                     console.log({id, ...body});

//                     if (addedNote) {
//                         res.statusCode = 200
//                         res.setHeader("Content-Type", "application/json");
//                         res.end(JSON.stringify(addedNote))
//                     } else {
//                         res.statusCode = 404
//                         res.setHeader("Content-Type", "application/json");
//                         res.end(JSON.stringify({message: 'Ups something wrong'}))
//                     }
//                 })
//             } else if (method === 'DELETE') {
//                 const response = db.delete(id)
//                 if (response) {
//                     res.statusCode = 200
//                     res.setHeader("Content-Type", "application/json");
//                     res.end(JSON.stringify(response))
//                 } else {
//                     res.statusCode = 404
//                     res.setHeader("Content-Type", "application/json");
//                     res.end(JSON.stringify({message: 'note not found'}))
//                 }
//             }

//             break
//         default:
//             res.writeHead(200)
//             res.end('RAQ')
//             break;
//     }
// }

app.listen(port, (error) => {
    if (error) {
        console.log('RAQ', error)
    } else {
        console.log(`Is happening something great on port ${port}...`)
    }
})

})()