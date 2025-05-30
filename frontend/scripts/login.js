// Přepínání mezi formuláři
document.getElementById('switch-to-register').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'flex';
        document.getElementById('register-form').classList.add('fade-in');
    }, 500);
});

document.getElementById('switch-to-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register-form').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'flex';
        document.getElementById('login-form').classList.add('fade-in');
    }, 500);
});

// Přihlášení uživatele
document.querySelector('#login-form .form-button').addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#login-form input[type="email"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;

    try {
        const res = await fetch('https://akkodis-in-run-frontend.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            window.location.href = 'dashboard.html';
        } else {
            alert(data.error || 'Chyba při přihlášení');
        }
    } catch (err) {
        alert('Server nedostupný');
    }
});

// Registrace uživatele
document.querySelector('#register-form .form-button').addEventListener('click', async (e) => {
    e.preventDefault();

const username = document.getElementById('reg-username').value;
const email = document.getElementById('reg-email').value;
const password = document.getElementById('reg-password').value;


    console.log("Odesílám data:", { username, email, password }); // DEBUG

    try {
        const res = await fetch('https://akkodis-in-run-frontend.onrender.com//api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
        });


let data = {};

if (res.headers.get("content-type")?.includes("application/json")) {
  data = await res.json();
} else {
  throw new Error('Backend nevrátil JSON!');
}
    } catch (err) {
        alert('Server nedostupný');
        console.error(err);
    }
});


