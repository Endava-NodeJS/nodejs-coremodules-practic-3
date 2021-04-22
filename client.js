const http = require('http');

http.get('http://localhost:8080/notes/1', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const dataString = Buffer.from(data).toString('utf8');
        console.log(JSON.stringify(dataString));
    })
});