function clientCredentials()
{
    const form = document.getElementById('clientCredentialsForm');
    const idClient = form.idClient.value;
    const clientSecret = form.clientSecret.value;

    fetch('http://localhost:8000/clientCredentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idClient: idClient,
            clientSecret: clientSecret,
            grantType: 'clientCredentials'
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('clientCredResult').innerText = JSON.stringify(data);
        });
}

function passwordCredentials()
{
    const form = document.getElementById('passwordCredentialsForm');
    const username = form.username.value;
    const password = form.password.value;
    const idClient = form.idClientP.value;
    const clientSecret = form.clientSecretP.value;

    fetch('http://localhost:8000/passwordCredentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            idClient: idClient,
            clientSecret: clientSecret,
            grantType: 'passwordCredentials',
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('passwordCredResult').innerText = JSON.stringify(data);
        });
}