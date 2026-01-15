# Matrix Dashboard - Memcrab Test Task

Interactive matrix table with dynamic calculations built with React and TypeScript.

## 🚀 Live Demo

[https://o-kornilova.github.io/matrix-dashboard/](https://o-kornilova.github.io/matrix-dashboard/)

## 📋 Features

- Generate M×N matrix with random 3-digit values
- Click cell to increment value (+1)
- Hover cell to highlight X nearest cells by value
- Hover sum to show percentages and heatmap
- Add/Remove rows dynamically
- Real-time calculations (sum, 60th percentile)

## 🛠️ Tech Stack

- React 18
- TypeScript
- Context API (state management)
- Vite (build tool)
- CSS (no libraries)

## 🏃 Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📦 Project Structure

```
src/
├── components/       # React components
├── context/          # Context API state management
├── types/            # TypeScript types
├── utils/            # Helper functions (calculations)
└── App.tsx           # Main app
```

## ✅ Requirements

- ✅ TypeScript + React + Context API
- ✅ No Redux/styled-components/UI libraries
- ✅ Matrix M×N with configurable size (0-100)
- ✅ Cell increment on click
- ✅ Nearest cells highlighting
- ✅ Percentage view with heatmap
- ✅ Add/Remove rows
- ✅ Sum and 60th percentile calculations

## 👤 Author

Oleksandra Kornilova

## 📅 Date

January 2026
