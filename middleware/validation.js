export const validateRegistration = (req, res, next) => {
  const { username, email, password, confirmPassword, fullName } = req.body;
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push('Username must be at least 3 characters');
  }
  if (!email || !email.includes('@')) {
    errors.push('Please provide a valid email');
  }
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  if (!fullName || fullName.trim().length < 2) {
    errors.push('Please provide your full name');
  }

  if (errors.length > 0) {
    return res.status(400).render('auth/register', {
      title: 'Register — Seat Master',
      errors,
      formData: { username, email, fullName },
      user: null,
    });
  }

  next();
};

export const validateEvent = (req, res, next) => {
  const { title, description, category_id, venue_name, event_date, base_price } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push('Event title is required');
  }
  if (!description || description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }
  if (!category_id) {
    errors.push('Category is required');
  }
  if (!venue_name) {
    errors.push('Venue name is required');
  }
  if (!event_date) {
    errors.push('Event date is required');
  }
  if (!base_price || isNaN(base_price) || parseFloat(base_price) <= 0) {
    errors.push('Valid price is required');
  }

  if (errors.length > 0) {
    req.validationErrors = errors;
  }

  next();
};

export const validateComment = (req, res, next) => {
  const { comment_text } = req.body;

  if (!comment_text || comment_text.trim().length < 3) {
    return res.status(400).json({ success: false, message: 'Comment must be at least 3 characters' });
  }
  if (comment_text.length > 500) {
    return res.status(400).json({ success: false, message: 'Comment must be less than 500 characters' });
  }

  next();
};

export const validateRating = (req, res, next) => {
  const { rating } = req.body;

  if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
  }

  next();
};
