# 🧑‍💻 Kriangkai Nantabut — Developer Portfolio

> Personal portfolio website — dark navy cyberpunk aesthetic with music player & smooth animations.

## 🔗 Live Demo
Deploy to GitHub Pages: `https://kriangkainantabut-lgtm.github.io/`

---

## 📁 Project Structure

```
portfolio-kriangkai/
├── index.html              ← Main HTML file
├── README.md               ← This file
└── assets/
    ├── css/
    │   └── styles.css      ← All styles (responsive)
    ├── js/
    │   └── main.js         ← Cursor, scroll reveal, music player
    └── img/
        └── profile.jpg     ← Profile photo
```

---

## 🚀 Deploy to GitHub Pages

1. **Create a new repo** on GitHub  
   → Name it exactly: `<your-username>.github.io`  
   → Or any name for a project page

2. **Push this folder**
   ```bash
   git init
   git add .
   git commit -m "🚀 initial portfolio deploy"
   git branch -M main
   git remote add origin https://github.com/kriangkainantabut-lgtm/<repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**  
   → Go to repo **Settings → Pages**  
   → Source: **Deploy from branch → main → / (root)**  
   → Click Save  
   → Your site will be live at `https://kriangkainantabut-lgtm.github.io/<repo-name>/`

---

## ✏️ Customization

### Update Personal Info
Edit `index.html` and change:
- Name, title, about text
- Social links (GitHub, LinkedIn, Twitter)
- Email address
- Project cards (name, description, tags, link)
- Experience entries

### Change Profile Photo
Replace `assets/img/profile.jpg` with your own photo.

### Change Music
In `assets/js/main.js`, find:
```js
const PLAYLIST_ID = 'RDJdzs-qcURQE';
const VIDEO_ID    = 'Jdzs-qcURQE';
```
Replace with your YouTube video/playlist ID.

### Change Colors
In `assets/css/styles.css`, edit the `:root` variables:
```css
:root {
  --bg:    #040d1a;   /* Main background */
  --glow2: #38bdf8;   /* Primary accent (blue) */
  --accent2: #6366f1; /* Secondary accent (indigo) */
  ...
}
```

---

## 🛠 Tech Stack
- Pure HTML5 / CSS3 / Vanilla JS — no frameworks
- Google Fonts: Syne + Space Mono + Inter
- YouTube IFrame API for music player

---

## 📄 License
MIT — free to use and modify.
