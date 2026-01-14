const form = document.getElementById('searchForm');
const input = document.getElementById('queryInput');
const toggle = document.getElementById('toggleType');
const toggleLabel = document.getElementById('toggleLabel');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');

toggle.addEventListener('change', () => {
  toggleLabel.textContent = toggle.checked ? 'Anime' : 'Movie';
});

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.style.color = isError ? '#ff6b6b' : '';
}

function clearResults() {
  resultsEl.innerHTML = '';
}

function renderCard(item) {
  const card = document.createElement('article');
  card.className = 'card';

  const img = document.createElement('img');
  img.className = 'poster';
  img.src = item.poster || 'https://via.placeholder.com/500x750?text=No+Image';
  img.alt = item.title;

  const meta = document.createElement('div');
  meta.className = 'meta';

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = item.title + (item.year ? ` (${item.year})` : '');

  const subtitle = document.createElement('div');
  subtitle.className = 'sub';
  // show original or english title when different
  if (item.original_title && item.original_title !== item.title) subtitle.textContent = item.original_title;
  else if (item.english_title && item.english_title !== item.title) subtitle.textContent = item.english_title;

  const chips = document.createElement('div');
  chips.className = 'chips';

  function makeChip(text) {
    const c = document.createElement('span');
    c.className = 'chip';
    c.textContent = text;
    return c;
  }

  // Rating chip (star)
  chips.appendChild(makeChip(`⭐ ${item.rating !== 'N/A' ? item.rating : '—'}`));

  // Movie-specific or anime-specific details
  if (item.vote_count) chips.appendChild(makeChip(`Votes: ${item.vote_count}`));
  if (item.episodes) chips.appendChild(makeChip(`Episodes: ${item.episodes}`));
  if (item.type) chips.appendChild(makeChip(item.type));
  if (item.status) chips.appendChild(makeChip(item.status));
  if (item.language) chips.appendChild(makeChip(item.language.toUpperCase()));
  if (item.content_rating) chips.appendChild(makeChip(item.content_rating));

  // genres
  if (item.genres && item.genres.length) {
    const genres = document.createElement('div');
    genres.className = 'genres';
    genres.textContent = `Genres: ${item.genres.slice(0,4).join(', ')}`;
    meta.appendChild(genres);
  }

  const overview = document.createElement('p');
  overview.className = 'overview';
  const fullText = (item.overview || item.synopsis || 'No description available.');
  overview.textContent = fullText;

  // If the overview is long, collapse it and add a Read more button
  const PREVIEW_CHARS = 220;
  if (fullText.length > PREVIEW_CHARS) {
    overview.classList.add('collapsed');
    overview.textContent = fullText.slice(0, PREVIEW_CHARS) + '...';

    const readMore = document.createElement('button');
    readMore.className = 'read-more';
    readMore.type = 'button';
    readMore.textContent = 'Read more';

    // also add a small chip in the chips row so it's visible at a glance
    const readMoreChip = makeChip('Read more');
    readMoreChip.classList.add('read-more-chip');

    function setExpandedState(expanded) {
      if (expanded) {
        overview.classList.add('expanded');
        overview.classList.remove('collapsed');
        overview.textContent = fullText;
        readMore.textContent = 'Show less';
        readMoreChip.textContent = 'Show less';
      } else {
        overview.classList.remove('expanded');
        overview.classList.add('collapsed');
        overview.textContent = fullText.slice(0, PREVIEW_CHARS) + '...';
        readMore.textContent = 'Read more';
        readMoreChip.textContent = 'Read more';
      }
    }

    readMore.addEventListener('click', () => {
      const isExpanded = !overview.classList.contains('expanded');
      setExpandedState(isExpanded);
    });

    readMoreChip.addEventListener('click', () => {
      const isExpanded = !overview.classList.contains('expanded');
      setExpandedState(isExpanded);
    });

    // append the chip so it is visible in the metadata row
    chips.appendChild(readMoreChip);

    meta.appendChild(title);
    if (subtitle.textContent) meta.appendChild(subtitle);
    meta.appendChild(chips);
    meta.appendChild(overview);
    meta.appendChild(readMore);
  } else {
    overview.classList.remove('collapsed');
    meta.appendChild(title);
    if (subtitle.textContent) meta.appendChild(subtitle);
    meta.appendChild(chips);
    meta.appendChild(overview);
  }

  card.appendChild(img);
  card.appendChild(meta);

  return card;
}

async function fetchResults(q, type) {
  setStatus('Loading...');
  clearResults();
  try {
    const url = `/api/${type}?q=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Server error');
    const data = await res.json();
    const results = data.results || [];
    if (!results.length) {
      setStatus('No results found. Try a different title.');
      return;
    }
    setStatus(`${results.length} result(s)`);
    results.forEach(item => resultsEl.appendChild(renderCard(item)));
  } catch (err) {
    console.error(err);
    setStatus('Something went wrong while fetching results. Please try again.', true);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (!q) return;
  const type = toggle.checked ? 'anime' : 'movie';
  await fetchResults(q, type);
});

// Small UX: search on Enter in input
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  }
});
