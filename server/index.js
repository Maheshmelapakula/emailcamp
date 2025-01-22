const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const campaignRoutes = require('./routes/campaignRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middleware

const corsOptions = {
  origin: '*', // Replace with your frontend domain
};


app.use(bodyParser.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
