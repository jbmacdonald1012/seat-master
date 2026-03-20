import purchaseModel from '../models/purchaseModel.js';
import eventModel from '../models/eventModel.js';
import ticketModel from '../models/ticketModel.js';

const purchaseController = {
  async showCheckout(req, res, next) {
    try {
      const { eventId } = req.params;
      const { tickets } = req.query;

      if (!tickets) {
        return res.redirect(`/events/${eventId}`);
      }

      const ticketIds = tickets.split(',').map((id) => parseInt(id));
      const event = await eventModel.getEventById(eventId);
      const selectedTickets = await Promise.all(ticketIds.map((id) => ticketModel.findById(id)));

      const total = selectedTickets.reduce((sum, t) => sum + parseFloat(t.price), 0);

      res.render('purchases/checkout', {
        title: 'Checkout — Seat Master',
        event,
        tickets: selectedTickets,
        total: total.toFixed(2),
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },

  async completePurchase(req, res, next) {
    try {
      const { event_id, ticket_ids, payment_method } = req.body;
      const userId = req.session.userId;

      const ticketIdArray = ticket_ids.split(',').map((id) => parseInt(id));
      const tickets = await Promise.all(ticketIdArray.map((id) => ticketModel.findById(id)));

      const unavailable = tickets.filter((t) => t.is_sold);
      if (unavailable.length > 0) {
        return res.status(400).json({ success: false, message: 'Some tickets are no longer available' });
      }

      const totalPrice = tickets.reduce((sum, t) => sum + parseFloat(t.price), 0);

      const purchase = await purchaseModel.create({
        user_id: userId,
        event_id: parseInt(event_id),
        ticket_ids: ticketIdArray,
        quantity: ticketIdArray.length,
        total_price: totalPrice,
        payment_method,
      });

      await ticketModel.markAsSold(ticketIdArray);
      await eventModel.updateAvailableTickets(parseInt(event_id), ticketIdArray.length);

      res.json({ success: true, message: 'Purchase completed successfully', purchaseId: purchase.id });
    } catch (error) {
      next(error);
    }
  },

  async viewPurchase(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.session.userId;

      const purchase = await purchaseModel.findById(id);

      if (!purchase) {
        return res.status(404).render('error', {
          title: 'Not Found',
          message: 'Purchase not found',
          status: 404,
          errorDetails: '',
          user: req.session.user,
        });
      }

      if (purchase.user_id !== userId && req.session.userRole !== 'admin' && req.session.userRole !== 'employee') {
        return res.status(403).render('error', {
          title: 'Access Denied',
          message: 'Access Denied',
          status: 403,
          errorDetails: '',
          user: req.session.user,
        });
      }

      res.render('purchases/detail', {
        title: 'Purchase Details — Seat Master',
        purchase,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default purchaseController;
