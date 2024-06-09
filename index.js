const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get movie data
app.get('/api/movies', (req, res) => {
  res.json({
    movies: [
      { id: 1, title: 'The Matrix', poster_url: 'https://image.tmdb.org/t/p/w500/dNiABwH9dnO7ErAIfVX0V6pMBCS.jpg' },
      { id: 2, title: 'Inception', poster_url: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg' }
    ]
  });
});

// Endpoint to handle voting
app.post('/vote', express.json(), (req, res) => {
  // Handle vote logic here
  console.log(`Movie ID ${req.body.movieId} voted`);
  res.sendStatus(200);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});