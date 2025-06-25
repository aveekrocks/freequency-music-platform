# Freequency - Royalty Free Music Library

## 🎵 Project Overview

Freequency is a modern, responsive web application designed for hosting and distributing royalty-free music perfect for social media content. The website allows users to browse, preview, and download 30-second audio clips for use in reels, stories, and other social media content.

## ✨ Features

### Core Functionality
- **Music Library**: Browse through categorized music collections
- **Search & Filter**: Find tracks by title, tags, or genre categories
- **Audio Preview**: Built-in audio player with progress tracking
- **One-Click Download**: Direct download functionality for all tracks
- **Responsive Design**: Works perfectly on desktop and mobile devices

### User Experience
- **Modern UI**: Beautiful gradient design with smooth animations
- **Category Filtering**: Filter by Electronic, Acoustic, Corporate, Hip Hop, Ambient, Rock
- **Tag-based Search**: Search by mood, style, or instrument tags
- **Visual Feedback**: Hover effects, loading states, and interactive elements
- **Progress Tracking**: Real-time audio playback progress for previews

### Technical Features
- **React-based**: Built with modern React and Vite for fast performance
- **Tailwind CSS**: Responsive styling with custom design system
- **Component Architecture**: Modular, maintainable code structure
- **Audio Management**: Efficient audio loading and playback controls

## 🚀 Live Demo

**Website URL**: https://5174-ielz34ggvoid9ta274ot1-53ed33ff.manusvm.computer

## 📁 Project Structure

```
music-library/
├── public/
│   └── audio/              # Audio files directory
│       └── README.md       # Instructions for adding music
├── src/
│   ├── components/
│   │   └── ui/            # UI components (buttons, cards, etc.)
│   ├── App.jsx            # Main application component
│   ├── App.css            # Styling and theme configuration
│   └── main.jsx           # Application entry point
├── index.html             # HTML template
└── package.json           # Dependencies and scripts
```

## 🎵 Adding Your Music

### Step 1: File Placement
Place your audio files in the `/public/audio/` directory:
- Supported formats: MP3, WAV, OGG (MP3 recommended)
- File size: Keep under 2MB per track
- Duration: 30 seconds ideal for social media

### Step 2: Update Music Data
Edit the `musicData` array in `/src/App.jsx` (around line 20):

```javascript
{
  id: 7, // Unique number
  title: "Your Track Title",
  artist: "Freequency", // Your brand name
  category: "electronic", // Genre category
  mood: "energetic", // Mood descriptor
  duration: 30, // Length in seconds
  file: "your-filename.mp3", // Must match actual filename
  tags: ["electronic", "upbeat", "energetic", "dance"] // Searchable keywords
}
```

### Step 3: Categories
Available categories:
- `electronic` - Electronic/EDM music
- `acoustic` - Acoustic/organic instruments
- `corporate` - Business/professional music
- `hip-hop` - Hip hop and urban beats
- `ambient` - Atmospheric/background music
- `rock` - Rock and guitar-driven music
- `lofi` - Lo-fi, chill, and study beats
- `cinematic` - Epic scores, trailers, and orchestral
- `synthwave` - Retro, 80s-inspired electronic music
- `new age` - Serene, meditative, and spiritual
- `edm` - Festival and club-ready dance tracks
- `soul` - Groovy, emotional, and uplifting soul
- `trap` - Hard-hitting bass and intense urban trap
- `orchestral` - Grand, dramatic compositions
- `jazz` - Smooth, chill, and improvisational jazz
- `nature` - Ambient sounds of nature 
- `trance` - Uplifting, dreamy, and melodic trance



### Step 4: Example File Structure
```
/public/audio/
├── upbeat-electronic.mp3
├── chill-acoustic.mp3
├── corporate-motivational.mp3
├── hip-hop-beat.mp3
├── ambient-dreamy.mp3
└── rock-energy.mp3
```

## 🛠️ Development

### Prerequisites
- Node.js 20.x or higher
- pnpm (preferred) or npm

### Local Development
```bash
# Navigate to project directory
cd music-library

# Install dependencies (already done)
pnpm install

# Start development server
pnpm run dev --host

# Access at http://localhost:5174
```

### Building for Production
```bash
# Build the project
pnpm run build

# Preview production build
pnpm run preview
```

## 🎨 Customization

### Branding
- Update the site title in `index.html`
- Modify the header logo and text in `App.jsx`
- Adjust color scheme in `App.css`

### Adding New Categories
1. Add category to the `categories` array in `App.jsx`
2. Include appropriate icon from Lucide React
3. Update the category filter logic

### Styling
- Primary colors: Purple to Blue gradient
- Dark mode support included
- Tailwind CSS for responsive design
- Custom animations and transitions

## 📱 Mobile Optimization

The website is fully responsive and optimized for:
- Touch interactions on mobile devices
- Responsive grid layout
- Mobile-friendly audio controls
- Optimized loading for slower connections

## 🔧 Technical Details

### Dependencies
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **shadcn/ui**: High-quality UI components

### Performance
- Lazy loading for audio files
- Optimized bundle size
- Fast development server with HMR
- Efficient state management

## 📄 License & Usage

This template is designed for royalty-free music distribution. Ensure all music you add is:
- Royalty-free or properly licensed
- Suitable for commercial use
- Compliant with platform terms of service

## 🚀 Deployment Options

The website can be deployed to:
- Vercel (recommended for React apps)
- Netlify
- GitHub Pages
- Any static hosting service

For permanent deployment, use the build files from the `dist/` directory after running `pnpm run build`.

---

**Created with ❤️ for content creators and music enthusiasts**

