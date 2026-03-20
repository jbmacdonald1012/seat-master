import purchaseModel from '../models/purchaseModel.js';

const dashboardController = {
  async userDashboard(req, res, next) {
    try {
      const userId = req.session.userId;
      const purchases = await purchaseModel.findByUserId(userId);
      res.render('dashboard/user', {
        title: 'My Dashboard — Seat Master',
        purchases,
        user: req.session.user,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default dashboardController;
