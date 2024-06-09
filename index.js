<<<<<<< HEAD
const express = require('express');
const path = require('path');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with your Telegram bot token

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }));
    res.json({ movies });
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/vote', express.json(), (req, res) => {
  console.log(`Movie ID ${req.body.movieId} voted`);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
<<<<<<< Updated upstream
=======
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
>>>>>>> 7e77b872d3867fc1cda1d0f7e2d506cc70ef4881
=======
});

// Telegram Bot Commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to Popcorn Picks! Click /play to start.');
});

bot.onText(/\/play/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    const movies = response.data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    bot.sendPhoto(chatId, `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`, { caption: randomMovie.title });
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    bot.sendMessage(chatId, 'Failed to fetch movie data. Please try again later.');
  }
>>>>>>> Stashed changes
});