const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { DBconnection } = require('./database/db.js');
DBconnection();

const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const progressRoutes = require('./routes/progressRoutes');
const contestRoutes = require('./routes/contestRoutes');
const authenticate = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/auth', authRoutes);
app.use(authenticate);
app.use('/problems', problemRoutes);
app.use('/progress', progressRoutes);
app.use('/contests', contestRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);