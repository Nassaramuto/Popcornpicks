document.addEventListener('DOMContentLoaded', () => {
  fetchMovies();
});

function fetchMovies() {
  fetch('/api/movies')
    .then(response => response.json())
    .then(data => displayMovies(data.movies))
    .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
  const poster1 = document.getElementById('poster1').querySelector('img');
  const poster2 = document.getElementById('poster2').querySelector('img');

  poster1.src = movies[0].poster_url;
  poster1.alt = movies[0].title;

  poster2.src = movies[1].poster_url;
  poster2.alt = movies[1].title;

  document.getElementById('poster1').setAttribute('onclick', `voteMovie(${movies[0].id})`);
  document.getElementById('poster2').setAttribute('onclick', `voteMovie(${movies[1].id})`);
}

function voteMovie(movieId) {
  fetch('/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId }),
  })
  .then(response => {
    if (response.ok) {
      alert('Vote recorded!');
      showCoins(movieId === 1 ? 'poster1' : 'poster2');
    } else {
      alert('Failed to record vote.');
    }
  })
  .catch(error => console.error('Error voting for movie:', error));
}

function showCoins(posterId) {
  const poster = document.getElementById(posterId);
  for (let i = 0; i < 10; i++) {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.style.left = `${Math.random() * 100}px`;
    poster.appendChild(coin);
    setTimeout(() => poster.removeChild(coin), 1000);
  }
}