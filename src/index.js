function clientCredentials()
{
    const form = document.getElementById('clientCredentialsForm');
    const idClient = form.idClient.value;
    const clientSecret = form.clientSecret.value;

    fetch('http://localhost:8000/client_credentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: idClient,
            client_secret: clientSecret,
            grant_type: 'client_credentials'
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

    fetch('http://localhost:8000/password_credentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            client_id: idClient,
            client_secret: clientSecret,
            grant_type: 'password_credentials',
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('passwordCredResult').innerText = JSON.stringify(data);
        });
}

function implicit()
{
    const form = document.getElementById('implicitForm');
    const idClient = form.idClientI.value;
    const redirect = form.redirectI.value;
    window.location = `http://localhost:8000/implicit?grant_type=implicit&client_id=${idClient}&redirect_uri=${encodeURIComponent(redirect)}`;
}

function authorizationCode() {
    const form = document.getElementById('authorizationCodeForm');
    const idClient = form.idClientA.value;
    const redirect = form.redirectA.value;
    window.location = `http://localhost:8000/authorization_code?grant_type=authorization_code&client_id=${idClient}&redirect_uri=${encodeURIComponent(redirect)}`;
}