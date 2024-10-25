const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();
const PORT = 3000;
const dotenv = require("dotenv");
const { connect } = require('./DB/dbconfig');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
dotenv.config();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
connect()
// Route for serving the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});
app.use('/api/rules', ruleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
