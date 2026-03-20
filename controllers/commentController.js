import commentModel from '../models/commentModel.js';

const commentController = {
  async createComment(req, res, next) {
    try {
      const { event_id, comment_text } = req.body;
      const userId = req.session.userId;

      const comment = await commentModel.create({ event_id, user_id: userId, comment_text });

      res.json({
        success: true,
        comment: {
          ...comment,
          username: req.session.user.username,
          full_name: req.session.user.full_name,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.session.userId;
      const userRole = req.session.userRole;

      const comment = await commentModel.findById(id);

      if (!comment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
      }

      if (comment.user_id !== userId && userRole !== 'admin' && userRole !== 'employee') {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }

      await commentModel.remove(id);
      res.json({ success: true, message: 'Comment deleted' });
    } catch (error) {
      next(error);
    }
  },

  async flagComment(req, res, next) {
    try {
      const { id } = req.params;
      await commentModel.flag(id);
      res.json({ success: true, message: 'Comment flagged for review' });
    } catch (error) {
      next(error);
    }
  },
};

export default commentController;
