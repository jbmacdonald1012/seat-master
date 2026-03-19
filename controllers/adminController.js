export async function dashboard(req, res) {
  res.render('admin/dashboard', {
    title: 'Admin Dashboard — Seat Master',
    user: req.session.user || null,
  });
}

export async function events(req, res) {
  res.render('admin/events', {
    title: 'Manage Events — Seat Master',
    user: req.session.user || null,
    events: [],
  });
}

export async function eventForm(req, res) {
  res.render('admin/event-form', {
    title: 'Event Form — Seat Master',
    user: req.session.user || null,
    event: null,
  });
}

export async function categories(req, res) {
  res.render('admin/categories', {
    title: 'Manage Categories — Seat Master',
    user: req.session.user || null,
    categories: [],
  });
}

export async function purchases(req, res) {
  res.render('admin/purchases', {
    title: 'Manage Purchases — Seat Master',
    user: req.session.user || null,
    purchases: [],
  });
}

export async function users(req, res) {
  res.render('admin/users', {
    title: 'Manage Users — Seat Master',
    user: req.session.user || null,
    users: [],
  });
}

export async function contacts(req, res) {
  res.render('admin/contacts', {
    title: 'Contact Messages — Seat Master',
    user: req.session.user || null,
    messages: [],
  });
}
