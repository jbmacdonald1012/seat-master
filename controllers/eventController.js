import eventModel from '../models/eventModel.js';

export async function list(req, res) {
  const events = await eventModel.getAllEvents();
  res.render('events/list', {
    title: 'Events — Seat Master',
    user: req.session.user || null,
    events,
  });
}

export async function detail(req, res) {
  const event = await eventModel.getEventById(req.params.id);
  res.render('events/detail', {
    title: event ? `${event.title} — Seat Master` : 'Event — Seat Master',
    user: req.session.user || null,
    event,
  });
}
