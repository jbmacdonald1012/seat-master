export async function index(req, res) {
  res.render('home/index', {
    title: 'Seat Master — Home',
    user: req.session.user || null,
  });
}

export async function about(req, res) {
  res.render('home/about', {
    title: 'About — Seat Master',
    user: req.session.user || null,
  });
}
