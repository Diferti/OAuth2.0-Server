dataBase =  {
    clients: [
        { idClient: 'client1', clientSecret: 'secret1', redirect: 'http://localhost:8000/callback'},
        { idClient: 'client2', clientSecret: 'secret2', redirect: 'http://localhost:8000/callback'}
    ],
    users: [
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' }
    ],
    tokens: []
};

module.exports = {dataBase};