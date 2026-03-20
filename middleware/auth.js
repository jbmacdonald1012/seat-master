export const requireAuth = (req, res, next) => {
  if (req.session?.userId) return next();
  req.session.returnTo = req.originalUrl;
  res.redirect('/auth/login?error=Please login to continue');
};

export const requireAdmin = (req, res, next) => {
  if (req.session?.userId && req.session.userRole === 'admin') return next();
  res.status(403).render('error', {
    title: 'Access Denied',
    message: 'Access Denied',
    status: 403,
    user: req.session?.user || null,
  });
};

export const requireEmployee = (req, res, next) => {
  const role = req.session?.userRole;
  if (req.session?.userId && (role === 'admin' || role === 'employee')) return next();
  res.status(403).render('error', {
    title: 'Access Denied',
    message: 'Access Denied',
    status: 403,
    user: req.session?.user || null,
  });
};

export const redirectIfAuth = (req, res, next) => {
  if (req.session?.userId) return res.redirect('/dashboard');
  next();
};
