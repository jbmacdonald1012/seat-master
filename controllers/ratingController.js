import ratingModel from '../models/ratingModel.js';

const ratingController = {
  async createOrUpdateRating(req, res, next) {
    try {
      const { event_id, rating } = req.body;
      const userId = req.session.userId;

      const savedRating = await ratingModel.upsert(event_id, userId, rating);
      const avgData = await ratingModel.getAverageByEvent(event_id);

      res.json({
        success: true,
        rating: savedRating,
        averageRating: parseFloat(avgData.avg_rating).toFixed(1),
        ratingCount: parseInt(avgData.count),
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteRating(req, res, next) {
    try {
      const { eventId } = req.params;
      const userId = req.session.userId;

      await ratingModel.deleteByUserAndEvent(userId, eventId);
      const avgData = await ratingModel.getAverageByEvent(eventId);

      res.json({
        success: true,
        message: 'Rating deleted',
        averageRating: parseFloat(avgData.avg_rating).toFixed(1),
        ratingCount: parseInt(avgData.count),
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ratingController;
