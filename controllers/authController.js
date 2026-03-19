export async function showLogin(req, res) {
  res.render('auth/login', {
    title: 'Login — Seat Master',
    user: req.session.user || null,
    error: null,
  });
}

export async function login(req, res) {
  res.status(501).send('Not implemented');
}

export async function showRegister(req, res) {
  res.render('auth/register', {
    title: 'Register — Seat Master',
    user: req.session.user || null,
    error: null,
  });
}

export async function register(req, res) {
  res.status(501).send('Not implemented');
}

export async function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}
