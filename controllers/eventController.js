import eventModel from '../models/eventModel.js';
import categoryModel from '../models/categoryModel.js';
import commentModel from '../models/commentModel.js';
import ratingModel from '../models/ratingModel.js';
import ticketModel from '../models/ticketModel.js';

const eventController = {
  async listEvents(req, res, next) {
    try {
      const { category, search } = req.query;
      let events;

      if (search) {
        events = await eventModel.searchEvents(search);
      } else if (category) {
        const categoryData = await categoryModel.getCategoryBySlug(category);
        events = categoryData ? await eventModel.getEventsByCategory(categoryData.id) : [];
      } else {
        events = await eventModel.getAllEvents();
      }

      const categories = await categoryModel.getAllCategories();
      res.render('events/list', {
        title: 'Events — Seat Master',
        events,
        categories,
        selectedCategory: category || null,
        searchTerm: search || '',
        user: req.session?.user || null,
      });
    } catch (error) {
      next(error);
    }
  },

  async viewEvent(req, res, next) {
    try {
      const eventId = req.params.id;
      const event = await eventModel.getEventById(eventId);

      if (!event) {
        return res.status(404).render('error', {
          title: 'Not Found',
          message: 'Event not found',
          status: 404,
          errorDetails: '',
          user: req.session?.user || null,
        });
      }

      const comments = await commentModel.findByEventId(eventId);
      const availableTickets = await ticketModel.findAvailableByEventId(eventId);

      let userRating = null;
      if (req.session?.userId) {
        userRating = await ratingModel.findByUserAndEvent(req.session.userId, eventId);
      }

      res.render('events/detail', {
        title: `${event.title} — Seat Master`,
        event,
        comments,
        availableTickets,
        userRating,
        user: req.session?.user || null,
      });
    } catch (error) {
      next(error);
    }
  },

  async eventsByCategory(req, res, next) {
    try {
      const { slug } = req.params;
      const category = await categoryModel.getCategoryBySlug(slug);

      if (!category) {
        return res.status(404).render('error', {
          title: 'Not Found',
          message: 'Category not found',
          status: 404,
          errorDetails: '',
          user: req.session?.user || null,
        });
      }

      const events = await eventModel.getEventsByCategory(category.id);
      const categories = await categoryModel.getAllCategories();
      res.render('events/list', {
        title: `${category.name} Events — Seat Master`,
        events,
        categories,
        selectedCategory: slug,
        searchTerm: '',
        user: req.session?.user || null,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default eventController;
