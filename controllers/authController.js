import userModel from '../models/userModel.js';

const authController = {
  showRegister(req, res) {
    res.render('auth/register', {
      title: 'Register — Seat Master',
      errors: [],
      formData: {},
      user: null,
    });
  },

  async register(req, res, next) {
    try {
      const { username, email, password, fullName } = req.body;

      const existingEmail = await userModel.findByEmail(email);
      if (existingEmail) {
        return res.status(400).render('auth/register', {
          title: 'Register — Seat Master',
          errors: ['Email already in use'],
          formData: { username, email, fullName },
          user: null,
        });
      }

      const existingUsername = await userModel.findByUsername(username);
      if (existingUsername) {
        return res.status(400).render('auth/register', {
          title: 'Register — Seat Master',
          errors: ['Username already taken'],
          formData: { username, email, fullName },
          user: null,
        });
      }

      const newUser = await userModel.createUser(username, email, password, fullName);

      req.session.userId = newUser.id;
      req.session.userRole = newUser.role;
      req.session.user = newUser;

      res.redirect('/dashboard');
    } catch (error) {
      next(error);
    }
  },

  showLogin(req, res) {
    const error = req.query.error || null;
    res.render('auth/login', {
      title: 'Login — Seat Master',
      error,
      user: null,
    });
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).render('auth/login', {
          title: 'Login — Seat Master',
          error: 'Invalid credentials',
          user: null,
        });
      }

      const isValid = await userModel.verifyPassword(password, user.password_hash);
      if (!isValid) {
        return res.status(401).render('auth/login', {
          title: 'Login — Seat Master',
          error: 'Invalid credentials',
          user: null,
        });
      }

      req.session.userId = user.id;
      req.session.userRole = user.role;
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      };

      const returnTo = req.session.returnTo || '/dashboard';
      delete req.session.returnTo;
      res.redirect(returnTo);
    } catch (error) {
      next(error);
    }
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.error('Logout error:', err);
      res.redirect('/');
    });
  },
};

export default authController;
