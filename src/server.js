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

server.post('/clientCredentials', (req, res) => {
    const {idClient, clientSecret, grantType} = req.body;

    if (grantType === 'clientCredentials')
    {
        let client = dataBase.clients.find((x) => x.idClient === idClient && x.clientSecret === clientSecret);
        if (client)
        {
            return res.status(200).json({ access_token: 'client_credentials_access_token' });
        }
    }
    res.status(400).json({error: 'Invalid data'});
});

server.post('/passwordCredentials', (req, res) => {
   const {username, password, idClient, clientSecret, grantType} = req.body;

   if (grantType === 'passwordCredentials')
   {
       let user = dataBase.users.find((el) => el.username === username && el.password === password);
       let client = dataBase.clients.find((x) => x.idClient === idClient && x.clientSecret === clientSecret);

       if (user && client)
       {
           return res.status(200).json({access_token: 'password_credentials_access_token'});
       }
   }
   res.status(400).json({error: 'Invalid data'});
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});