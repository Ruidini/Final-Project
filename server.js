const express = require('express');
const app = express();
const path = require('path');
const pitchRoutes = require('./routes/pitches');

require('dotenv').config();

//Middleware 

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes

app.use('/', pitchRoutes);

// 404 Error page

app.use((req, res) => {
  res.status(404).render('404');
});

// Start server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
