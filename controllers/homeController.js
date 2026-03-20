import eventModel from '../models/eventModel.js';
import categoryModel from '../models/categoryModel.js';

const homeController = {
  async index(req, res, next) {
    try {
      const featuredEvents = await eventModel.getFeaturedEvents(6);
      const categories = await categoryModel.getAllCategories();
      res.render('home/index', {
        title: 'Seat Master — Find Your Next Event',
        featuredEvents,
        categories,
        user: req.session?.user || null,
      });
    } catch (error) {
      next(error);
    }
  },

  about(req, res) {
    res.render('home/about', {
      title: 'About — Seat Master',
      user: req.session?.user || null,
    });
  },
};

export default homeController;
