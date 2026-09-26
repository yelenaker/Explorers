<div align="center">

<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  <h1>WanderMatch - Travel Destination & Event Finder</h1>

  <p>Discover your perfect travel destination based on budget range, duration, and lifestyle preferences.</p>

</div>

## 🚀 Automatic GitHub Pages Deployment

This repository is pre-configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the app to **GitHub Pages** whenever you push to `main` or `master`.

### One-Time Setup in your GitHub Repository:
1. Go to your GitHub repository: `https://github.com/yelenaker/Explorers`
2. Click **Settings** (top tabs) -> **Pages** (in the left sidebar under "Code and automation").
3. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
4. Push your changes:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
5. GitHub Actions will run automatically and deploy your site to:
   `https://yelenaker.github.io/Explorers/`

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

