export async function list(req, res) {
  res.render('events/list', {
    title: 'Events — Seat Master',
    user: req.session.user || null,
    events: [],
  });
}

export async function detail(req, res) {
  res.render('events/detail', {
    title: 'Event Detail — Seat Master',
    user: req.session.user || null,
    event: null,
  });
}
