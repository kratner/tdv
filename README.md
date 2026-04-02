# Trans-Dimensional Voyage

An interactive, fully responsive slide viewer showcasing the Trans-Dimensional Voyage collection.

## 🔗 Live Demo

**View the live site: <a href="https://kratner.github.io/tdv/" target="_blank" rel="noopener noreferrer">https://kratner.github.io/tdv/</a>**

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Use arrow keys (← →) to navigate slides
- **Touch Support**: Swipe left/right on mobile devices
- **Autoplay Mode**: Automatic slideshow with play/pause control (Space bar)
- **Fullscreen Support**: Press 'F' or use the fullscreen button
- **Thumbnail Navigation**: Quick access to any slide via thumbnail bar
- **Modern UI**: Dark theme with smooth animations and transitions

## 🎮 Controls

### Keyboard
- `←` / `→` : Navigate between slides
- `Space` : Toggle autoplay mode
- `F` : Toggle fullscreen
- `Esc` : Exit autoplay mode

### Mouse/Touch
- Click navigation arrows on sides
- Click thumbnails to jump to specific slides
- Swipe left/right on touchscreen devices
- Use control buttons in top-right corner

## 🚀 Viewing Locally

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 📦 Publishing to GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select the `main` branch
4. Click Save
5. Your site will be available at `https://[username].github.io/tdv/`

Or use the command line:

```bash
git add .
git commit -m "Add slide viewer"
git push origin main
```

## 📁 Structure

```
tdv/
├── index.html                          # Main HTML file
├── styles.css                          # Responsive CSS styles
├── script.js                           # Slide viewer functionality
├── trans-dimensional-voyager-original/ # Image folder (15 PNG slides)
│   ├── tdv-01.png
│   ├── tdv-02.png
│   └── ...
└── README.md
```

## 🛠️ Technologies

- Pure HTML5, CSS3, and vanilla JavaScript
- No dependencies or frameworks required
- Optimized for performance with lazy loading
- Mobile-first responsive design

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

Made with ❤️ for exploring trans-dimensional spaces
