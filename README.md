# Xourist - Luxury Slow Travel Experiences

![Xourist Snapshot](https://via.placeholder.com/1200x600?text=Xourist+Home+Page)

## Project Overview

Xourist is a professionally curated digital platform offering luxury slow-travel experiences in India. From Himalayan treks to village homestays and spiritual journeys like Char Dham Yatra and Kailash Mansarovar, the platform provides users with an immersive preview and streamlined reservation process.

## Key Features

- **Immersive User Interface:** High-end, dynamic visual design using glassmorphism, parallax scrolling, and sophisticated hover effects.
- **Multipage Architecture:** Clean, pre-rendered static multipage setup for high performance.
- **Form Interactivity:** Fully styled and auto-fill capable contact and booking forms.
- **Modular Asset Management:** Dynamic dependency mapping through Vite ensuring optimized loading for heavy imagery and web interactions.

## Tech Stack

- **Frontend:** HTML5, modern vanilla CSS3 (CSS Variables, keyframe animations, grid/flex)
- **Tooling:** Vite for bundle optimization
- **Interactions:** Vanilla ES6+ JavaScript (Intersection Observers, requestAnimationFrame)
- **Deployment Strategy:** Vercel (static site output with `dist/` automated routing)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kanishk0107/xourist.git
   cd xourist
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view the site.

## Deployment Steps

This project is optimized for direct import into **Vercel**. 

1. Push your code to your GitHub repository.
2. In Vercel, select the repository.
3. Use the following build settings (auto-detected):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy!
