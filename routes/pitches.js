const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Homepage

router.get('/', (req, res) => {
  res.render('index');
});

// Search Route

router.post('/search', async (req, res) => {
  const { location } = req.body;
  
  if (!location || location.trim() === '') {
    return res.render('index', { error: 'Please enter a location.' });
  }
  
  try {
    const [results] = await db.query(
      "SELECT * FROM pitches WHERE location LIKE ?", 
      [`%${location}%`]
    );

    res.render('results', { pitches: results, searchQuery: location });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
