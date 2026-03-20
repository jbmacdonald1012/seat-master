import session from 'express-session';
import userModel from '../models/userModel.js';

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
});

export const loadUser = async (req, res, next) => {
  if (req.session?.userId) {
    try {
      const user = await userModel.findById(req.session.userId);
      if (user) {
        req.session.user = user;
        res.locals.user = user;
        res.locals.isAuthenticated = true;
      } else {
        req.session.destroy();
      }
    } catch (err) {
      console.error('Error loading user:', err);
    }
  }
  if (!res.locals.isAuthenticated) res.locals.isAuthenticated = false;
  next();
};

export default sessionMiddleware;
