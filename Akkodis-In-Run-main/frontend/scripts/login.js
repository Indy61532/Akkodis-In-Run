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
