const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const TMDB_KEY = process.env.TMDB_API_KEY;

if (!TMDB_KEY) {
  console.warn('Warning: TMDB_API_KEY is not set in .env');
}

app.use(express.static(path.join(__dirname, 'public')));

// Movie endpoint - proxies TMDB
app.get('/api/movie', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Query parameter q is required' });
  if (!TMDB_KEY) return res.status(500).json({ error: 'TMDB API key not configured on server' });
  try {
    const tmdbUrl = 'https://api.themoviedb.org/3/search/movie';
    const response = await axios.get(tmdbUrl, {
      params: {
        api_key: TMDB_KEY,
        query: q,
        language: 'en-US',
        include_adult: false,
        page: 1
      }
    });
    const results = (response.data.results || []).map(r => ({
      id: r.id,
      title: r.title || r.original_title || 'Untitled',
      original_title: r.original_title || null,
      release_date: r.release_date || null,
      year: r.release_date ? r.release_date.slice(0,4) : (r.release_date ? r.release_date : 'N/A'),
      rating: r.vote_average ? Number(r.vote_average).toFixed(1) : 'N/A',
      vote_count: r.vote_count || 0,
      popularity: r.popularity || 0,
      language: r.original_language || null,
      adult: !!r.adult,
      overview: r.overview || '',
      poster: r.poster_path ? `https://image.tmdb.org/t/p/w500${r.poster_path}` : null
    }));
    res.json({ results });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch movies from TMDB' });
  }
});

// Anime endpoint - proxies Jikan
app.get('/api/anime', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Query parameter q is required' });
  try {
    const jikanUrl = 'https://api.jikan.moe/v4/anime';
    const response = await axios.get(jikanUrl, { params: { q, limit: 12 } });
    const results = (response.data.data || []).map(a => ({
      id: a.mal_id || null,
      title: a.title || 'Untitled',
      english_title: a.title_english || null,
      episodes: a.episodes || null,
      type: a.type || null,
      status: a.status || null,
      aired_from: a.aired && a.aired.from ? a.aired.from : null,
      year: a.aired && a.aired.from ? new Date(a.aired.from).getFullYear() : (a.year || 'N/A'),
      rating: a.score ? Number(a.score).toFixed(1) : 'N/A',
      content_rating: a.rating || null,
      rank: a.rank || null,
      overview: a.synopsis || '',
      poster: a.images && a.images.jpg ? a.images.jpg.image_url : null,
      genres: (a.genres || []).map(g => g.name),
      producers: (a.producers || []).map(p => p.name)
    }));
    res.json({ results });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch anime from Jikan' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
