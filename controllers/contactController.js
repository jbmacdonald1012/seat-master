import contactModel from '../models/contactModel.js';

const contactController = {
  showContactForm(req, res) {
    res.render('contact/form', {
      title: 'Contact Us — Seat Master',
      errors: [],
      formData: {},
      user: req.session?.user || null,
    });
  },

  async submitContact(req, res, next) {
    try {
      const { name, email, subject, message } = req.body;
      const errors = [];

      if (!name || name.trim().length < 2) errors.push('Name is required');
      if (!email || !email.includes('@')) errors.push('Valid email is required');
      if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters');

      if (errors.length > 0) {
        return res.status(400).render('contact/form', {
          title: 'Contact Us — Seat Master',
          errors,
          formData: { name, email, subject, message },
          user: req.session?.user || null,
        });
      }

      await contactModel.create({ name, email, subject, message });
      res.redirect('/contact/success');
    } catch (error) {
      next(error);
    }
  },

  success(req, res) {
    res.render('contact/success', {
      title: 'Message Sent — Seat Master',
      user: req.session?.user || null,
    });
  },
};

export default contactController;
