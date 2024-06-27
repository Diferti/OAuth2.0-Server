const express = require('express');
const parser = require('body-parser');
const jwt = require('jsonwebtoken');
const {dataBase} = require('../src/data.js');
const cors = require('cors');

const PORT = process.env.PORT || 8000;

const server = express();
server.use(cors());
server.use(parser.json());
server.use(parser.urlencoded({ extended: true }));

const generateToken = (id) => {
    return jwt.sign({ id }, 'private_key', { expiresIn: 100000 });
};

server.post('/client_credentials', (req, res) => {
    const {client_id, client_secret, grant_type} = req.body;

    if (grant_type === 'client_credentials')
    {
        let client = dataBase.clients.find((x) => x.client_id === client_id && x.client_secret === client_secret);
        if (client)
        {
            const access_token = generateToken(client_id);
            return res.status(200).json({ access_token: access_token });
        }
    }
    res.status(400).json({error: 'Invalid data'});
});

server.post('/password_credentials', (req, res) => {
   const {username, password, client_id, client_secret, grant_type} = req.body;

   if (grant_type === 'password_credentials')
   {
       let user = dataBase.users.find((el) => el.username === username && el.password === password);
       let client = dataBase.clients.find((x) => x.client_id === client_id && x.client_secret === client_secret);

       if (user && client)
       {
           const access_token = generateToken(username);
           return res.status(200).json({ access_token: access_token });
       }
   }
   res.status(400).json({error: 'Invalid data'});
});

server.get('/implicit', (req, res) => {
    const { grant_type, client_id, redirect_uri } = req.query;

    if (grant_type === 'implicit')
    {
        const client = dataBase.clients.find((x) => x.client_id === client_id && x.redirect_uri === redirect_uri);
        if (client)
        {
            const access_token = generateToken(client_id);
            return res.redirect(`${redirect_uri}?access_token=${access_token}`);
        }
    }
    res.status(400).json({ error: 'Invalid date' });
});

server.get('/authorization_code', (req, res) => {
    const { grant_type, client_id, redirect_uri } = req.query;

    if (grant_type === 'authorization_code')
    {
        const client = dataBase.clients.find((x) => x.client_id === client_id && x.redirect_uri === redirect_uri);
        if (client)
        {
            const auth_code = Math.random().toString(36).substring(7);
            return res.redirect(`${redirect_uri}?code=${auth_code}`);
        }
   }
    res.status(400).json({ error: 'Invalid date' });
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});