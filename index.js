var http = require('http');

http.get('http://api.weatherstack.com/current?access_key=a0b5a0610fc1eb8fa3a870a7f8cba8e0&query=Chisinau', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
})
