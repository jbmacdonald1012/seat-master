export function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/');
  }
  next();
}

export function requireEmployee(req, res, next) {
  const role = req.session.user?.role;
  if (!role || (role !== 'admin' && role !== 'employee')) {
    return res.redirect('/');
  }
  next();
}
