module.exports = (req, res, next) => {
    const { authorization } = req.headers; 

    if(!authorization){ 
        res.status(400);
        res.end('Bad request');
    }else{
        const [, token] = authorization.split(' ');

        if(!token) { 
            res.status(400);
            res.end('Bad request');
        }
    }
} 