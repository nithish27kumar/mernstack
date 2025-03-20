const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Correct MongoDB connection URL
const url='mongodb://127.0.0.1:27017/SampleDb';
mongoose.connect(url,{dbname:"nithishDb"}).then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log("error connecting to db");
})


// Define the user schema and model
const us = new mongoose.Schema({
  name: String,
});
const Users = mongoose.model('Users', us);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve the sample HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission and insert data into MongoDB
app.post('/submit', async (req, res) => {
  const userData = req.body;

  // Use the User model to create and save a new document
  try {
    const newUser = await User.create(userData);
    res.json(newUser);  // Respond with the created user data
  } catch (err) {
    res.status(500).json({ error: 'Error inserting user into database' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started at http://127.0.0.1:3000");
});