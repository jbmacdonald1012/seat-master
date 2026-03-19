// Express 5 error handler — must have exactly 4 arguments
export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).render('error', {
    title: 'Error',
    message: err.message || 'Something went wrong.',
    status,
    user: req.session.user || null,
  });
}
