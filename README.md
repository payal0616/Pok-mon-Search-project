# MPT — Pokédex Pro

A full-stack web application that lets you browse and search Pokémon using the [PokéAPI](https://pokeapi.co/). The frontend is built with **AngularJS 1.x** and **Bootstrap 5**; the backend is a lightweight **Node.js** server with **Express**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
- [API Used](#api-used)
- [Screenshots & Assets](#screenshots--assets)
- [Uploading to GitHub](#uploading-to-github)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- Search Pokémon by name or browse the full Pokédex
- View detailed stats, types, abilities, and sprites
- Responsive UI styled with Bootstrap 5
- Custom Pokédex-themed design with background imagery
- REST API integration via Axios on the client side
- Static file serving through an Express backend

---

## Tech Stack

| Layer      | Technology                          |
|-----------|--------------------------------------|
| Frontend  | AngularJS 1.8, Bootstrap 5, HTML/CSS |
| Backend   | Node.js, Express 5                   |
| HTTP      | Axios                                |
| Data      | [PokéAPI](https://pokeapi.co/)       |

---

## Project Structure

```
MPT/
├── README.md                 # This file
├── .gitignore                # Git ignore rules (excludes node_modules, etc.)
├── MPT/
│   ├── package.json          # Root Angular dependency
│   ├── package-lock.json
│   └── my-angular-node-app/
│       ├── package.json      # Express app dependencies
│       ├── package-lock.json
│       ├── server.js         # Express server entry point
│       └── public/
│           ├── index.html    # Main AngularJS app (Pokédex Pro UI)
│           ├── app.js        # AngularJS controller & PokéAPI logic
│           └── 9191cc196406557.66276572bfcd6.jpg  # Background image
```

---

## Prerequisites

Before running the project, make sure you have:

- **Node.js** (v16 or newer recommended) — [https://nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** (for version control and GitHub upload) — [https://git-scm.com](https://git-scm.com)
- A modern web browser (Chrome, Firefox, Edge, etc.)
- An internet connection (the app fetches data from PokéAPI)

---

## Installation

1. **Clone the repository** (after uploading to GitHub):

   ```bash
   git clone https://github.com/YOUR_USERNAME/MPT.git
   cd MPT/MPT/my-angular-node-app
   ```

2. **Install backend dependencies**:

   ```bash
   npm install
   ```

3. *(Optional)* Install root-level Angular dependency if needed:

   ```bash
   cd ..
   npm install
   ```

---

## Running the Application

1. Navigate to the app folder:

   ```bash
   cd MPT/my-angular-node-app
   ```

2. Start the Express server:

   ```bash
   node server.js
   ```

3. Open your browser and visit:

   ```
   http://localhost:3000
   ```

4. Use the Pokédex interface to search for Pokémon by name or browse the list.

---

## How It Works

1. **Express server** (`server.js`) listens on port `3000` and serves static files from the `public/` folder.
2. **index.html** loads AngularJS, Bootstrap, and the main app script.
3. **app.js** defines an AngularJS module and controller that calls the PokéAPI to fetch Pokémon data.
4. Results are displayed in a card-based UI with type badges, stats, and images.

---

## API Used

This project uses the free, public **[PokéAPI](https://pokeapi.co/)** — no API key required.

Example endpoint:

```
https://pokeapi.co/api/v2/pokemon/{name or id}
```

---

## Screenshots & Assets

- Background image: `public/9191cc196406557.66276572bfcd6.jpg`
- UI theme: Pokédex-inspired red, blue, and yellow color palette

---

## Uploading to GitHub

This project is set up for Git. Follow these steps to publish it:

### 1. Create a new repository on GitHub

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `MPT` (or any name you prefer)
3. Leave it **empty** — do **not** add a README, `.gitignore`, or license (this repo already has them)
4. Click **Create repository**

### 2. Push from your computer

Open a terminal in the project root (`sem 6/MPT`) and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/MPT.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Authentication

When prompted for credentials, use a **Personal Access Token** (not your GitHub password):

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens**
2. Generate a token with `repo` scope
3. Use the token as your password when Git asks

---

## Troubleshooting

| Problem | Solution |
|--------|----------|
| `Port 3000 already in use` | Stop other apps on port 3000, or change `PORT` in `server.js` |
| Pokémon not loading | Check your internet connection; PokéAPI must be reachable |
| `node_modules` too large on GitHub | They are excluded by `.gitignore` — run `npm install` after cloning |
| Git push rejected | Make sure the remote URL is correct and you are authenticated |

---

## License

This project is for educational purposes (Semester 6 — MPT). Pokémon and related assets are © Nintendo / Game Freak / The Pokémon Company. PokéAPI data is used under its own terms.

---

## Author

Payal Pawar — Semester 6 Project
