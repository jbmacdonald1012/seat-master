export async function showCheckout(req, res) {
  res.render('purchases/checkout', {
    title: 'Checkout — Seat Master',
    user: req.session.user || null,
    ticket: null,
  });
}

export async function checkout(req, res) {
  res.status(501).send('Not implemented');
}

export async function detail(req, res) {
  res.render('purchases/detail', {
    title: 'Purchase — Seat Master',
    user: req.session.user || null,
    purchase: null,
  });
}
