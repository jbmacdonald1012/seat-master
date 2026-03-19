export async function showForm(req, res) {
  res.render('contact/form', {
    title: 'Contact Us — Seat Master',
    user: req.session.user || null,
    error: null,
  });
}

export async function submit(req, res) {
  res.status(501).send('Not implemented');
}

export async function success(req, res) {
  res.render('contact/success', {
    title: 'Message Sent — Seat Master',
    user: req.session.user || null,
  });
}
