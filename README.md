# 🎬 Movie & Anime Info Fetcher

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/API-TMDB%20%7C%20Jikan-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/UI-Dark%20Modern-purple?style=for-the-badge" />
</p>

<p align="center">
  A modern, minimal web app to search <b>Movies</b> and <b>Anime</b> using public APIs — built with Node.js, Express, and a sleek dark UI.
</p>

---

## ✨ Features

* 🔍 Search movies & anime by title
* 🔁 Toggle between **Movie** and **Anime** modes
* ⚡ Async/Await API fetching
* 🖼️ Poster images, title, year, rating & description — includes extra metadata like votes, episodes, type, status, and genres
* 🌙 Dark UI with glassmorphism cards
* 🎨 Smooth hover animations
* 📱 Fully responsive (mobile & desktop)
* ⏳ Loading state & graceful error handling
* ❌ Animated “No results found” state

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **APIs:** TMDB (Movies), Jikan (Anime)
* **Frontend:** HTML, CSS, JavaScript
* **UI Style:** Dark mode, Glassmorphism
* **Fonts:** Google Fonts (Inter)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/RelayDevloper/movie-anime-fetcher.git
cd movie-anime-fetcher
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Get TMDB API Key

* Visit: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
* Create a free API key

### 4️⃣ Add your TMDB API Key

Open the existing `.env` file in the project root and add your TMDB API key:

```env
TMDB_API_KEY=your_api_key_here
```

### 5️⃣ Run the App

```bash
node server.js
```

🌐 Open **[http://localhost:3000](http://localhost:3000)** in your browser

---

## 🚀 Usage

1. Enter a movie or anime title in the search bar
2. Select **Movie** or **Anime** from the dropdown
3. Click **Search**
4. Browse results in beautiful animated cards

---

## 🖼️ UI Preview
<p align="center">
   <img src="Screenshot 2026-01-14 145336.png" />
</p>

---

## 🧠 Learning Highlights

* Working with third-party REST APIs
* Async/Await & error handling
* Express backend + frontend integration
* Modern responsive UI design
* Clean project structure

---

## 🌱 Future Enhancements

* Skeleton loader animation
* Tailwind CSS version
* Infinite scrolling
* Favorites / Watchlist
* Deployment (Vercel / Render)

---

## ❤️ Contributing

Pull requests are welcome. Feel free to fork this project and improve it.

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

<p align="center">
  Built with ❤️ for learning, practice, and portfolio use
</p>
