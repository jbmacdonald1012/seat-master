import eventModel from '../models/eventModel.js';
import categoryModel from '../models/categoryModel.js';
import purchaseModel from '../models/purchaseModel.js';
import userModel from '../models/userModel.js';
import commentModel from '../models/commentModel.js';
import contactModel from '../models/contactModel.js';

const adminController = {
  async dashboard(req, res, next) {
    try {
      const stats = await purchaseModel.getStats();
      const recentPurchases = (await purchaseModel.getAll()).slice(0, 10);
      const flaggedComments = await commentModel.getFlaggedComments();
      const unreadMessages = await contactModel.findByStatus('unread');

      res.render('admin/dashboard', {
        title: 'Admin Dashboard — Seat Master',
        stats,
        recentPurchases,
        flaggedComments,
        unreadMessages,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },

  async manageEvents(req, res, next) {
    try {
      const events = await eventModel.getAllEvents();
      const categories = await categoryModel.getAllCategories();
      res.render('admin/events', {
        title: 'Manage Events — Seat Master',
        events,
        categories,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },

  async newEventForm(req, res, next) {
    try {
      const categories = await categoryModel.getAllCategories();
      res.render('admin/event-form', {
        title: 'New Event — Seat Master',
        event: null,
        categories,
        errors: [],
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },

  async createEvent(req, res, next) {
    try {
      if (req.validationErrors) {
        const categories = await categoryModel.getAllCategories();
        return res.status(400).render('admin/event-form', {
          title: 'New Event — Seat Master',
          event: null,
          categories,
          errors: req.validationErrors,
          user: req.session.user,
        });
      }

      const eventData = {
        title: req.body.title,
        description: req.body.description,
        category_id: req.body.category_id,
        venue_name: req.body.venue_name,
        venue_address: req.body.venue_address,
        city: req.body.city,
        state: req.body.state,
        event_date: req.body.event_date,
        image_url: req.body.image_url,
        total_tickets: req.body.total_tickets || 0,
        available_tickets: req.body.total_tickets || 0,
        base_price: req.body.base_price,
        cost_per_ticket: req.body.cost_per_ticket || 0,
        is_featured: req.body.is_featured === 'on',
      };

      await eventModel.createEvent(eventData);
      res.redirect('/admin/events?success=Event created successfully');
    } catch (error) {
      next(error);
    }
  },

  async editEventForm(req, res, next) {
    try {
      const event = await eventModel.getEventById(req.params.id);
      const categories = await categoryModel.getAllCategories();

      if (!event) {
        return res.status(404).render('error', {
          title: 'Not Found',
          message: 'Event not found',
          status: 404,
          errorDetails: '',
          user: req.session.user,
        });
      }

      res.render('admin/event-form', {
        title: 'Edit Event — Seat Master',
        event,
        categories,
        errors: [],
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateEvent(req, res, next) {
    try {
      if (req.validationErrors) {
        const categories = await categoryModel.getAllCategories();
        const event = await eventModel.getEventById(req.params.id);
        return res.status(400).render('admin/event-form', {
          title: 'Edit Event — Seat Master',
          event,
          categories,
          errors: req.validationErrors,
          user: req.session.user,
        });
      }

      const eventData = {
        title: req.body.title,
        description: req.body.description,
        category_id: req.body.category_id,
        venue_name: req.body.venue_name,
        venue_address: req.body.venue_address,
        city: req.body.city,
        state: req.body.state,
        event_date: req.body.event_date,
        image_url: req.body.image_url,
        base_price: req.body.base_price,
        cost_per_ticket: req.body.cost_per_ticket || 0,
        is_featured: req.body.is_featured === 'on',
        is_active: req.body.is_active === 'on',
      };

      await eventModel.updateEvent(req.params.id, eventData);
      res.redirect('/admin/events?success=Event updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async deleteEvent(req, res, next) {
    try {
      await eventModel.deleteEvent(req.params.id);
      res.redirect('/admin/events?success=Event deleted successfully');
    } catch (error) {
      next(error);
    }
  },

  async manageCategories(req, res, next) {
    try {
      const categories = await categoryModel.getAllCategories();
      res.render('admin/categories', {
        title: 'Manage Categories — Seat Master',
        categories,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },

  async managePurchases(req, res, next) {
    try {
      const { status } = req.query;
      const purchases = status
        ? await purchaseModel.findByStatus(status)
        : await purchaseModel.getAll();

      res.render('admin/purchases', {
        title: 'Manage Purchases — Seat Master',
        purchases,
        selectedStatus: status || null,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },

  async updatePurchaseStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await purchaseModel.updateStatus(id, status);
      res.json({ success: true, message: 'Purchase status updated' });
    } catch (error) {
      next(error);
    }
  },

  async manageUsers(req, res, next) {
    try {
      const users = await userModel.getAllUsers();
      res.render('admin/users', {
        title: 'Manage Users — Seat Master',
        users,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },

  async manageContacts(req, res, next) {
    try {
      const messages = await contactModel.getAll();
      res.render('admin/contacts', {
        title: 'Contact Messages — Seat Master',
        messages,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default adminController;
