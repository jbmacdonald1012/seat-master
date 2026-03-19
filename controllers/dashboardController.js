export async function userDashboard(req, res) {
  res.render('dashboard/user', {
    title: 'My Dashboard — Seat Master',
    user: req.session.user || null,
    purchases: [],
  });
}
