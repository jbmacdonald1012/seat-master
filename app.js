import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import sessionMiddleware from './middleware/session.js';
import errorHandler from './middleware/errorHandler.js';

import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import eventsRouter from './routes/events.js';
import purchasesRouter from './routes/purchases.js';
import dashboardRouter from './routes/dashboard.js';
import adminRouter from './routes/admin.js';
import contactRouter from './routes/contact.js';
import apiRouter from './routes/api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Static assets
app.use(express.static(join(__dirname, 'public')));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(sessionMiddleware);

// Make NODE_ENV available to all EJS templates
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/events', eventsRouter);
app.use('/purchases', purchasesRouter);
app.use('/dashboard', dashboardRouter);
app.use('/admin', adminRouter);
app.use('/contact', contactRouter);
app.use('/api', apiRouter);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Seat Master running on http://localhost:${PORT}`);
});

// WebSocket server for dev-mode live reload
if (NODE_ENV.includes('dev')) {
  const ws = await import('ws');
  const wsPort = parseInt(PORT) + 1;
  const wsServer = new ws.WebSocketServer({ port: wsPort });
  wsServer.on('listening', () => {
    console.log(`WebSocket server running on port ${wsPort}`);
  });
  wsServer.on('error', (err) => {
    console.error('WebSocket server error:', err);
  });
}

export default app;
