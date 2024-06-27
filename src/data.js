dataBase =  {
    clients: [
        { client_id: 'client1', client_secret: 'secret1', redirect_uri: 'http://localhost:8000/callback' },
        { client_id: 'client2', client_secret: 'secret2', redirect_uri: 'http://localhost:8000/callback' }
    ],
    users: [
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' }
    ],
    tokens: []
};

module.exports = {dataBase};