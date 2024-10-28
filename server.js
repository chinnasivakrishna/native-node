// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://chinnasivakrishna2003:siva@cluster0.u7gjmpo.mongodb.net/native?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model (modify as needed)
const NotificationSchema = new mongoose.Schema({
  title: String,
  body: String,
  data: Object,
});

const Notification = mongoose.model('Notification', NotificationSchema);

// Route to send notification data to MongoDB
app.post('/notifications', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
