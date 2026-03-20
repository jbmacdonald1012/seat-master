export function globalErrorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong.';
  const errorDetails = process.env.NODE_ENV?.includes('dev') ? err.stack : '';
  res.status(status).render('error', {
    title: 'Error',
    message,
    status,
    errorDetails,
    user: req.session?.user || null,
  });
}

export function notFoundHandler(req, res, next) {
  res.status(404).render('error', {
    title: 'Not Found',
    message: 'Page Not Found',
    status: 404,
    errorDetails: '',
    user: req.session?.user || null,
  });
}
