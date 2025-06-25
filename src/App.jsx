import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Play, Pause, Download, Search, Music, Volume2, Clock, Tag } from 'lucide-react'
import './App.css'

function App() {
  // State management for the music library
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  
  // Audio reference for controlling playback
  const audioRef = useRef(null)

  // Sample music data - Replace this with your actual music files
  // TO ADD YOUR MUSIC: 
  // 1. Place your audio files in the /public/audio/ directory
  // 2. Update this musicData array with your file information
  // 3. Make sure the 'file' property matches your actual filename
  const musicData = [
    {
      id: 1,
      title: "Upbeat Electronic",
      artist: "Freequency",
      category: "electronic",
      mood: "energetic",
      duration: 32,
      file: "electronic.wav", // Place this file in /public/audio/
      tags: ["electronic", "upbeat", "energetic", "dance"]
    },
    {
      id: 2,
      title: "Chill Acoustic",
      artist: "Freequency",
      category: "acoustic",
      mood: "relaxed",
      duration: 32,
      file: "chill.wav", // Place this file in /public/audio/
      tags: ["acoustic", "chill", "relaxed", "guitar"]
    },
    {
      id: 3,
      title: "Corporate Motivational",
      artist: "Freequency",
      category: "corporate",
      mood: "inspiring",
      duration: 32,
      file: "motivation.wav", // Place this file in /public/audio/
      tags: ["corporate", "motivational", "inspiring", "business"]
    },
    {
      id: 4,
      title: "Hip Hop Beat",
      artist: "Freequency",
      category: "hip-hop",
      mood: "cool",
      duration: 32,
      file: "beat.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "beat", "cool", "urban"]
    },
    {
      id: 5,
      title: "Ambient Dreamy",
      artist: "Freequency",
      category: "ambient",
      mood: "dreamy",
      duration: 32,
      file: "dreamy.wav", // Place this file in /public/audio/
      tags: ["ambient", "dreamy", "atmospheric", "peaceful"]
    },
    {
      id: 6,
      title: "Rock Energy",
      artist: "Freequency",
      category: "rock",
      mood: "powerful",
      duration: 32,
      file: "energy.wav", // Place this file in /public/audio/
      tags: ["rock", "energy", "powerful", "guitar"]
    },
    {
      id: 7,
      title: "Chill Vibes",
      artist: "Freequency",
      category: "lofi",
      mood: "relaxed",
      duration: 32,
      file: "vibe.wav",
      tags: ["lofi", "chill", "study", "relaxed"]
    },
    {
      id: 8,
      title: "Epic Journey",
      artist: "Freequency",
      category: "cinematic",
      mood: "epic",
      duration: 32,
      file: "epic.wav",
      tags: ["cinematic", "epic", "orchestral", "trailer"]
    },
    {
      id: 9,
      title: "Sunset Drive",
      artist: "Freequency",
      category: "synthwave",
      mood: "nostalgic",
      duration: 32,
      file: "drivee.wav",
      tags: ["synthwave", "retro", "drive", "80s"]
    },
    {
      id: 10,
      title: "Rainy Mood",
      artist: "Freequency",
      category: "ambient",
      mood: "calm",
      duration: 32,
      file: "rainy.wav",
      tags: ["ambient", "rain", "calm", "soothing"]
    },
    {
      id: 12,
      title: "Ocean Dream",
      artist: "Freequency",
      category: "new age",
      mood: "serene",
      duration: 32,
      file: "oceano.wav",
      tags: ["new age", "ocean", "serene", "nature"]
    },
    {
      id: 13,
      title: "Fast Lane",
      artist: "Freequency",
      category: "rock",
      mood: "fast-paced",
      duration: 32,
      file: "lane.wav",
      tags: ["rock", "speed", "guitar", "drums"]
    },
    {
      id: 14,
      title: "Whispers",
      artist: "Freequency",
      category: "ambient",
      mood: "mysterious",
      duration: 32,
      file: "whisper.wav",
      tags: ["ambient", "mystery", "slow", "atmospheric"]
    },
    {
      id: 15,
      title: "Festival Lights",
      artist: "Freequency",
      category: "edm",
      mood: "party",
      duration: 32,
      file: "festival.wav",
      tags: ["edm", "party", "dance", "festival"]
    },
    {
      id: 16,
      title: "Soulful Days",
      artist: "Freequency",
      category: "soul",
      mood: "uplifting",
      duration: 32,
      file: "days.wav",
      tags: ["soul", "groove", "uplift", "bass"]
    },
    {
      id: 17,
      title: "Hustle Mode",
      artist: "Freequency",
      category: "trap",
      mood: "intense",
      duration: 32,
      file: "hustler.wav",
      tags: ["trap", "bass", "hard", "beat"]
    },
    {
      id: 18,
      title: "Frozen Peak",
      artist: "Freequency",
      category: "orchestral",
      mood: "dramatic",
      duration: 32,
      file: "peak.wav",
      tags: ["orchestral", "epic", "cinematic", "drama"]
    },
    {
      id: 19,
      title: "Lazy Afternoon",
      artist: "Freequency",
      category: "jazz",
      mood: "chill",
      duration: 32,
      file: "lazy.wav",
      tags: ["jazz", "chill", "smooth", "piano"]
    },
    {
      id: 20,
      title: "The Chase",
      artist: "Freequency",
      category: "cinematic",
      mood: "thrilling",
      duration: 32,
      file: "chase.wav",
      tags: ["cinematic", "thrill", "tension", "orchestra"]
    },
    {
      id: 21,
      title: "Serenity Fields",
      artist: "Freequency",
      category: "nature",
      mood: "peaceful",
      duration: 32,
      file: "serenity.wav",
      tags: ["nature", "peace", "calm", "birds"]
    },
    {
      id: 23,
      title: "Infinite Skies",
      artist: "Freequency",
      category: "trance",
      mood: "elevating",
      duration: 32,
      file: "skies.wav",
      tags: ["trance", "uplifting", "sky", "dream"]
    },
    {
      id: 24,
      title: "Chillwave Vibes",
      artist: "Freequency",
      category: "electronic",
      mood: "relaxed",
      duration: 32,
      file: "chillwave.wav", // Place this file in /public/audio/
      tags: ["electronic", "chillwave", "ambient", "relaxed"]
    },
    {
      id: 25,
      title: "Synthwave Ride",
      artist: "Freequency",
      category: "electronic",
      mood: "nostalgic",
      duration: 32,
      file: "synthwave.wav", // Place this file in /public/audio/
      tags: ["electronic", "synthwave", "retro", "nostalgic"]
    },
    {
      id: 26,
      title: "EDM Festival Drop",
      artist: "Freequency",
      category: "electronic",
      mood: "high energy",
      duration: 32,
      file: "edm.wav", // Place this file in /public/audio/
      tags: ["electronic", "edm", "festival", "dance", "drop"]
    },
    {
      id: 27,
      title: "Lo-Fi Chill Beats",
      artist: "Freequency",
      category: "electronic",
      mood: "calm",
      duration: 32,
      file: "lofi.wav", // Place this file in /public/audio/
      tags: ["electronic", "lofi", "chill", "study", "relax"]
    },
    {
      id: 28,
      title: "Future Bass Bounce",
      artist: "Freequency",
      category: "electronic",
      mood: "uplifting",
      duration: 32,
      file: "future.wav", // Place this file in /public/audio/
      tags: ["electronic", "futurebass", "bounce", "uplifting"]
    },
    {
      id: 29,
      title: "Dark Techno Pulse",
      artist: "Freequency",
      category: "electronic",
      mood: "intense",
      duration: 32,
      file: "dark.wav", // Place this file in /public/audio/
      tags: ["electronic", "techno", "dark", "intense", "underground"]
    },
    {
      id: 30,
      title: "Glitch Hop Mayhem",
      artist: "Freequency",
      category: "electronic",
      mood: "quirky",
      duration: 32,
      file: "glitch.wav", // Place this file in /public/audio/
      tags: ["electronic", "glitchhop", "funky", "quirky"]
    },
    {
      id: 31,
      title: "Trance Elevation",
      artist: "Freequency",
      category: "electronic",
      mood: "euphoric",
      duration: 32,
      file: "trance.wav", // Place this file in /public/audio/
      tags: ["electronic", "trance", "uplift", "euphoric", "melodic"]
    },
    {
      id: 32,
      title: "Dubstep Carnage",
      artist: "Freequency",
      category: "electronic",
      mood: "aggressive",
      duration: 32,
      file: "dubstep.wav", // Place this file in /public/audio/
      tags: ["electronic", "dubstep", "bass", "aggressive", "hard"]
    },
    {
      id: 33,
      title: "Morning Strums",
      artist: "Freequency",
      category: "acoustic",
      mood: "uplifting",
      duration: 32,
      file: "strums.wav", // Place this file in /public/audio/
      tags: ["acoustic", "uplifting", "guitar", "sunny", "feel-good"]
    },
    {
      id: 34,
      title: "Rustic Evening",
      artist: "Freequency",
      category: "acoustic",
      mood: "melancholic",
      duration: 32,
      file: "rustic.wav", // Place this file in /public/audio/
      tags: ["acoustic", "slow", "emotional", "folk", "melancholic"]
    },
    {
      id: 35,
      title: "Campfire Sessions",
      artist: "Freequency",
      category: "acoustic",
      mood: "warm",
      duration: 32,
      file: "camp.wav", // Place this file in /public/audio/
      tags: ["acoustic", "campfire", "guitar", "cozy", "natural"]
    },
    {
      id: 36,
      title: "Fingerstyle Flow",
      artist: "Freequency",
      category: "acoustic",
      mood: "peaceful",
      duration: 32,
      file: "flow.wav", // Place this file in /public/audio/
      tags: ["acoustic", "fingerstyle", "peaceful", "instrumental"]
    },
    {
      id: 37,
      title: "Countryside Sunrise",
      artist: "Freequency",
      category: "acoustic",
      mood: "hopeful",
      duration: 32,
      file: "sunrise.wav", // Place this file in /public/audio/
      tags: ["acoustic", "sunrise", "guitar", "hopeful", "morning"]
    },
    {
      id: 38,
      title: "Barefoot Melody",
      artist: "Freequency",
      category: "acoustic",
      mood: "lighthearted",
      duration: 32,
      file: "barefoot.wav", // Place this file in /public/audio/
      tags: ["acoustic", "melody", "lighthearted", "happy", "nature"]
    },
    {
      id: 39,
      title: "Raindrop Strings",
      artist: "Freequency",
      category: "acoustic",
      mood: "soothing",
      duration: 32,
      file: "raindrop.wav", // Place this file in /public/audio/
      tags: ["acoustic", "soothing", "rain", "soft", "calm"]
    },
    {
      id: 40,
      title: "Sunset Walk",
      artist: "Freequency",
      category: "acoustic",
      mood: "romantic",
      duration: 32,
      file: "sunset.wav", // Place this file in /public/audio/
      tags: ["acoustic", "sunset", "romantic", "guitar", "emotional"]
    },
    {
      id: 41,
      title: "Windswept Harmony",
      artist: "Freequency",
      category: "acoustic",
      mood: "reflective",
      duration: 32,
      file: "harmony.wav", // Place this file in /public/audio/
      tags: ["acoustic", "reflective", "gentle", "harmony", "solo guitar"]
    },
    {
      id: 42,
      title: "Success Horizon",
      artist: "Freequency",
      category: "corporate",
      mood: "uplifting",
      duration: 32,
      file: "success.wav", // Place this file in /public/audio/
      tags: ["corporate", "uplifting", "success", "inspiration"]
    },
    {
      id: 43,
      title: "Innovate Forward",
      artist: "Freequency",
      category: "corporate",
      mood: "motivational",
      duration: 32,
      file: "innovate.wav", // Place this file in /public/audio/
      tags: ["corporate", "motivational", "innovation", "teamwork"]
    },
    {
      id: 44,
      title: "Bright Ideas",
      artist: "Freequency",
      category: "corporate",
      mood: "positive",
      duration: 32,
      file: "ideas.wav", // Place this file in /public/audio/
      tags: ["corporate", "positive", "presentation", "light"]
    },
    {
      id: 45,
      title: "Strategy Flow",
      artist: "Freequency",
      category: "corporate",
      mood: "focused",
      duration: 32,
      file: "strategy.wav", // Place this file in /public/audio/
      tags: ["corporate", "focused", "planning", "smooth"]
    },
    {
      id: 46,
      title: "Team Elevate",
      artist: "Freequency",
      category: "corporate",
      mood: "collaborative",
      duration: 32,
      file: "team.wav", // Place this file in /public/audio/
      tags: ["corporate", "collaboration", "growth", "modern"]
    },
    {
      id: 47,
      title: "Vision Board",
      artist: "Freequency",
      category: "corporate",
      mood: "dreamy",
      duration: 32,
      file: "vision.wav", // Place this file in /public/audio/
      tags: ["corporate", "vision", "dream", "branding"]
    },
    {
      id: 48,
      title: "Momentum Drive",
      artist: "Freequency",
      category: "corporate",
      mood: "energetic",
      duration: 32,
      file: "drive.wav", // Place this file in /public/audio/
      tags: ["corporate", "drive", "energetic", "launch"]
    },
    {
      id: 49,
      title: "Client Confidence",
      artist: "Freequency",
      category: "corporate",
      mood: "trustworthy",
      duration: 32,
      file: "client.wav", // Place this file in /public/audio/
      tags: ["corporate", "trust", "branding", "presentation"]
    },
    {
      id: 50,
      title: "Product Launch Pad",
      artist: "Freequency",
      category: "corporate",
      mood: "exciting",
      duration: 32,
      file: "pad.wav", // Place this file in /public/audio/
      tags: ["corporate", "launch", "product", "exciting"]
    },
        {
      id: 51,
      title: "Urban Flow",
      artist: "Freequency",
      category: "hip-hop",
      mood: "groovy",
      duration: 32,
      file: "urban.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "urban", "groove", "rhythm"]
    },
    {
      id: 52,
      title: "Street Vibe",
      artist: "Freequency",
      category: "hip-hop",
      mood: "gritty",
      duration: 32,
      file: "street.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "street", "gritty", "raw"]
    },
    {
      id: 53,
      title: "Lo-Fi Bounce",
      artist: "Freequency",
      category: "hip-hop",
      mood: "chill",
      duration: 32,
      file: "bounce.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "lofi", "bounce", "chill"]
    },
    {
      id: 54,
      title: "Trap Dream",
      artist: "Freequency",
      category: "hip-hop",
      mood: "dark",
      duration: 32,
      file: "dream.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "trap", "dreamy", "dark"]
    },
    {
      id: 55,
      title: "Golden Mic",
      artist: "Freequency",
      category: "hip-hop",
      mood: "confident",
      duration: 32,
      file: "mic.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "rap", "confident", "vocal"]
    },
    {
      id: 56,
      title: "Bounce Back",
      artist: "Freequency",
      category: "hip-hop",
      mood: "motivated",
      duration: 32,
      file: "back.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "motivational", "comeback", "grind"]
    },
    {
      id: 57,
      title: "Neon Streets",
      artist: "Freequency",
      category: "hip-hop",
      mood: "stylish",
      duration: 32,
      file: "neons.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "vibes", "neon", "modern"]
    },
    {
      id: 58,
      title: "808 Heat",
      artist: "Freequency",
      category: "hip-hop",
      mood: "intense",
      duration: 32,
      file: "808.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "808", "bass", "intense"]
    },
    {
      id: 59,
      title: "Late Night Cipher",
      artist: "Freequency",
      category: "hip-hop",
      mood: "smooth",
      duration: 32,
      file: "cipher.wav", // Place this file in /public/audio/
      tags: ["hip-hop", "cipher", "freestyle", "smooth"]
    },
        {
      id: 60,
      title: "Stellar Drift",
      artist: "Freequency",
      category: "ambient",
      mood: "spacey",
      duration: 32,
      file: "stellar.wav", // Place this file in /public/audio/
      tags: ["ambient", "space", "drift", "ethereal", "calm"]
    },
    {
      id: 61,
      title: "Ocean Mist",
      artist: "Freequency",
      category: "ambient",
      mood: "soothing",
      duration: 32,
      file: "ocean.wav", // Place this file in /public/audio/
      tags: ["ambient", "ocean", "mist", "relaxing", "serene"]
    },
    {
      id: 62,
      title: "Cloud Silence",
      artist: "Freequency",
      category: "ambient",
      mood: "peaceful",
      duration: 32,
      file: "cloud.wav", // Place this file in /public/audio/
      tags: ["ambient", "calm", "clouds", "light", "quiet"]
    },
    {
      id: 63,
      title: "Inner Light",
      artist: "Freequency",
      category: "ambient",
      mood: "meditative",
      duration: 32,
      file: "inner.wav", // Place this file in /public/audio/
      tags: ["ambient", "meditation", "inner peace", "zen"]
    },
    {
      id: 64,
      title: "Frozen Echoes",
      artist: "Freequency",
      category: "ambient",
      mood: "mystical",
      duration: 32,
      file: "frozen.wav", // Place this file in /public/audio/
      tags: ["ambient", "icy", "mystical", "echo", "space"]
    },
    {
      id: 65,
      title: "Lunar Bloom",
      artist: "Freequency",
      category: "ambient",
      mood: "dreamy",
      duration: 32,
      file: "lunar.wav", // Place this file in /public/audio/
      tags: ["ambient", "moon", "dreamy", "soft", "nature"]
    },
    {
      id: 66,
      title: "Timeless Horizon",
      artist: "Freequency",
      category: "ambient",
      mood: "infinite",
      duration: 32,
      file: "timeless.wav", // Place this file in /public/audio/
      tags: ["ambient", "horizon", "timeless", "float", "atmospheric"]
    },
        {
      id: 67,
      title: "Thunder Riff",
      artist: "Freequency",
      category: "rock",
      mood: "intense",
      duration: 32,
      file: "riff.wav", // Place this file in /public/audio/
      tags: ["rock", "guitar", "intense", "solo", "power"]
    },
    {
      id: 68,
      title: "Neon Breakdown",
      artist: "Freequency",
      category: "rock",
      mood: "gritty",
      duration: 32,
      file: "neonb.wav", // Place this file in /public/audio/
      tags: ["rock", "grunge", "alternative", "urban", "gritty"]
    },
    {
      id: 69,
      title: "Midnight Stage",
      artist: "Freequency",
      category: "rock",
      mood: "live",
      duration: 32,
      file: "stage.wav", // Place this file in /public/audio/
      tags: ["rock", "live", "stage", "crowd", "energy"]
    },
    {
      id: 70,
      title: "Rebel Drive",
      artist: "Freequency",
      category: "rock",
      mood: "edgy",
      duration: 32,
      file: "rebel.wav", // Place this file in /public/audio/
      tags: ["rock", "drive", "edgy", "fast", "rebellious"]
    },
    {
      id: 71,
      title: "Amped Up",
      artist: "Freequency",
      category: "rock",
      mood: "energetic",
      duration: 32,
      file: "amped.wav", // Place this file in /public/audio/
      tags: ["rock", "amped", "energy", "drive", "guitar"]
    },
    {
      id: 72,
      title: "Starlight Anthem",
      artist: "Freequency",
      category: "rock",
      mood: "anthemic",
      duration: 32,
      file: "anthem.wav", // Place this file in /public/audio/
      tags: ["rock", "anthem", "epic", "stadium", "uplifting"]
    },
    {
      id: 73,
      title: "Crimson Waves",
      artist: "Freequency",
      category: "rock",
      mood: "emotional",
      duration: 32,
      file: "waves.wav", // Place this file in /public/audio/
      tags: ["rock", "emotional", "melodic", "alternative", "depth"]
    },
    {
      id: 74,
      title: "Voltage Rush",
      artist: "Freequency",
      category: "rock",
      mood: "fast-paced",
      duration: 32,
      file: "voltage.wav", // Place this file in /public/audio/
      tags: ["rock", "voltage", "rush", "fast", "electric"]
    },
        {
      id: 75,
      title: "Cafe Drizzle",
      artist: "Freequency",
      category: "lofi",
      mood: "cozy",
      duration: 32,
      file: "drizz.wav",
      tags: ["lofi", "cozy", "rain", "coffee", "relaxed"]
    },
    {
      id: 76,
      title: "Vintage Static",
      artist: "Freequency",
      category: "lofi",
      mood: "nostalgic",
      duration: 32,
      file: "static.wav",
      tags: ["lofi", "retro", "static", "vintage", "nostalgic"]
    },
    {
      id: 77,
      title: "Dreamloop",
      artist: "Freequency",
      category: "lofi",
      mood: "dreamy",
      duration: 32,
      file: "loop.wav",
      tags: ["lofi", "dreamy", "ambient", "loop", "soft"]
    },
    {
      id: 78,
      title: "Notebook Nights",
      artist: "Freequency",
      category: "lofi",
      mood: "focused",
      duration: 32,
      file: "nights.wav",
      tags: ["lofi", "study", "focus", "night", "writing"]
    },
    {
      id: 79,
      title: "Mellow Transit",
      artist: "Freequency",
      category: "lofi",
      mood: "calm",
      duration: 32,
      file: "transit.wav",
      tags: ["lofi", "calm", "vibes", "commute", "mellow"]
    },
    {
      id: 80,
      title: "Window Light",
      artist: "Freequency",
      category: "lofi",
      mood: "soft",
      duration: 32,
      file: "light.wav",
      tags: ["lofi", "soft", "sunlight", "study", "warm"]
    },
    {
      id: 81,
      title: "Retro Sketches",
      artist: "Freequency",
      category: "lofi",
      mood: "creative",
      duration: 32,
      file: "retro.wav",
      tags: ["lofi", "creative", "doodle", "inspiration", "retro"]
    },
    {
      id: 82,
      title: "Evening Echo",
      artist: "Freequency",
      category: "lofi",
      mood: "peaceful",
      duration: 32,
      file: "echo.wav",
      tags: ["lofi", "peaceful", "evening", "echo", "downtempo"]
    },
    {
      id: 83,
      title: "Blank Page",
      artist: "Freequency",
      category: "lofi",
      mood: "reflective",
      duration: 32,
      file: "blank.wav",
      tags: ["lofi", "reflective", "thoughtful", "minimal", "journal"]
    },
        {
      id: 84,
      title: "Final Ascent",
      artist: "Freequency",
      category: "cinematic",
      mood: "heroic",
      duration: 32,
      file: "final.wav",
      tags: ["cinematic", "heroic", "orchestral", "uplifting", "epic"]
    },
    {
      id: 85,
      title: "Dark Horizon",
      artist: "Freequency",
      category: "cinematic",
      mood: "intense",
      duration: 32,
      file: "darkk.wav",
      tags: ["cinematic", "intense", "drama", "trailer", "tense"]
    },
    {
      id: 86,
      title: "Legacy Begins",
      artist: "Freequency",
      category: "cinematic",
      mood: "inspiring",
      duration: 32,
      file: "begin.wav",
      tags: ["cinematic", "inspiring", "emotional", "story", "hero"]
    },
    {
      id: 87,
      title: "Frozen Throne",
      artist: "Freequency",
      category: "cinematic",
      mood: "dark",
      duration: 32,
      file: "throne.wav",
      tags: ["cinematic", "dark", "ambient", "fantasy", "mystery"]
    },
    {
      id: 88,
      title: "Battle Cry",
      artist: "Freequency",
      category: "cinematic",
      mood: "aggressive",
      duration: 32,
      file: "cry.wav",
      tags: ["cinematic", "battle", "aggressive", "action", "drums"]
    },
    {
      id: 89,
      title: "Celestial Rise",
      artist: "Freequency",
      category: "cinematic",
      mood: "majestic",
      duration: 32,
      file: "rise.wav",
      tags: ["cinematic", "majestic", "orchestra", "space", "triumph"]
    },
    {
      id: 90,
      title: "Silent Kingdom",
      artist: "Freequency",
      category: "cinematic",
      mood: "mysterious",
      duration: 32,
      file: "silent.wav",
      tags: ["cinematic", "mystery", "medieval", "fantasy", "ambient"]
    },
    {
      id: 91,
      title: "Timebreaker",
      artist: "Freequency",
      category: "cinematic",
      mood: "suspenseful",
      duration: 32,
      file: "breaker.wav",
      tags: ["cinematic", "clock", "suspense", "trailer", "build-up"]
    },
        {
      id: 92,
      title: "Neon Highways",
      artist: "Freequency",
      category: "synthwave",
      mood: "retro",
      duration: 32,
      file: "highway.wav",
      tags: ["synthwave", "neon", "retro", "80s", "drive"]
    },
    {
      id: 93,
      title: "Digital Mirage",
      artist: "Freequency",
      category: "synthwave",
      mood: "futuristic",
      duration: 32,
      file: "digital.wav",
      tags: ["synthwave", "futuristic", "analog", "dream", "cyber"]
    },
    {
      id: 94,
      title: "Chrome Nights",
      artist: "Freequency",
      category: "synthwave",
      mood: "moody",
      duration: 32,
      file: "chrome.wav",
      tags: ["synthwave", "chrome", "midnight", "synth", "vintage"]
    },
    {
      id: 95,
      title: "Pulse Reactor",
      artist: "Freequency",
      category: "synthwave",
      mood: "intense",
      duration: 32,
      file: "react.wav",
      tags: ["synthwave", "pulse", "bass", "intense", "drive"]
    },
    {
      id: 96,
      title: "Retro Bloom",
      artist: "Freequency",
      category: "synthwave",
      mood: "uplifting",
      duration: 32,
      file: "bloom.wav",
      tags: ["synthwave", "retro", "uplifting", "aesthetic", "light"]
    },
    {
      id: 97,
      title: "Electric Dusk",
      artist: "Freequency",
      category: "synthwave",
      mood: "chill",
      duration: 32,
      file: "dusk.wav",
      tags: ["synthwave", "electric", "chill", "dusk", "analog"]
    },
    {
      id: 98,
      title: "Hologram Fade",
      artist: "Freequency",
      category: "synthwave",
      mood: "dreamy",
      duration: 32,
      file: "fade.wav",
      tags: ["synthwave", "hologram", "fade", "dreamy", "ambient"]
    },
    {
      id: 99,
      title: "Night Arcade",
      artist: "Freequency",
      category: "synthwave",
      mood: "playful",
      duration: 32,
      file: "arcade.wav",
      tags: ["synthwave", "arcade", "playful", "game", "retro"]
    },
    {
      id: 100,
      title: "Crimson Glow",
      artist: "Freequency",
      category: "synthwave",
      mood: "emotional",
      duration: 32,
      file: "glow.wav",
      tags: ["synthwave", "emotional", "glow", "late night", "nostalgia"]
    },
        {
      id: 101,
      title: "Forest Whisper",
      artist: "Freequency",
      category: "new age",
      mood: "peaceful",
      duration: 32,
      file: "forests.wav",
      tags: ["new age", "forest", "peaceful", "nature", "calm"]
    },
    {
      id: 102,
      title: "Zen Flow",
      artist: "Freequency",
      category: "new age",
      mood: "meditative",
      duration: 32,
      file: "zen.wav",
      tags: ["new age", "zen", "meditation", "relax", "mindfulness"]
    },
    {
      id: 103,
      title: "Crystal Waters",
      artist: "Freequency",
      category: "new age",
      mood: "soothing",
      duration: 32,
      file: "water.wav",
      tags: ["new age", "water", "soothing", "healing", "tranquil"]
    },
    {
      id: 104,
      title: "Inner Light",
      artist: "Freequency",
      category: "new age",
      mood: "uplifting",
      duration: 32,
      file: "lite.wav",
      tags: ["new age", "spiritual", "light", "uplifting", "clarity"]
    },
    {
      id: 105,
      title: "Celestial Winds",
      artist: "Freequency",
      category: "new age",
      mood: "ethereal",
      duration: 32,
      file: "windy.wav",
      tags: ["new age", "wind", "space", "celestial", "ethereal"]
    },
    {
      id: 106,
      title: "Island Aura",
      artist: "Freequency",
      category: "new age",
      mood: "tropical",
      duration: 32,
      file: "aura.wav",
      tags: ["new age", "island", "calm", "ocean", "breeze"]
    },
    {
      id: 107,
      title: "Healing Stones",
      artist: "Freequency",
      category: "new age",
      mood: "restorative",
      duration: 32,
      file: "stone.wav",
      tags: ["new age", "healing", "stones", "vibration", "calm"]
    },
    {
      id: 108,
      title: "Sunrise Temple",
      artist: "Freequency",
      category: "new age",
      mood: "sacred",
      duration: 32,
      file: "temple.wav",
      tags: ["new age", "temple", "sunrise", "spiritual", "ritual"]
    },
    {
      id: 109,
      title: "Breath of Earth",
      artist: "Freequency",
      category: "new age",
      mood: "natural",
      duration: 32,
      file: "earth.wav",
      tags: ["new age", "earth", "breathe", "organic", "calm"]
    },
        {
      id: 110,
      title: "Bassline Fever",
      artist: "Freequency",
      category: "edm",
      mood: "energetic",
      duration: 32,
      file: "fever.wav",
      tags: ["edm", "bass", "club", "dance", "energy"]
    },
    {
      id: 111,
      title: "Rave Pulse",
      artist: "Freequency",
      category: "edm",
      mood: "intense",
      duration: 32,
      file: "rave.wav",
      tags: ["edm", "rave", "pulse", "festival", "drop"]
    },
    {
      id: 112,
      title: "Glowstorm",
      artist: "Freequency",
      category: "edm",
      mood: "uplifting",
      duration: 32,
      file: "storm.wav",
      tags: ["edm", "uplifting", "glow", "electro", "party"]
    },
    {
      id: 113,
      title: "Drop Machine",
      artist: "Freequency",
      category: "edm",
      mood: "hype",
      duration: 32,
      file: "drop.wav",
      tags: ["edm", "drop", "build-up", "energy", "club"]
    },
    {
      id: 114,
      title: "Rhythm Storm",
      artist: "Freequency",
      category: "edm",
      mood: "dynamic",
      duration: 32,
      file: "rhythm.wav",
      tags: ["edm", "rhythm", "storm", "dance", "beat"]
    },
    {
      id: 115,
      title: "Flashwave",
      artist: "Freequency",
      category: "edm",
      mood: "bright",
      duration: 32,
      file: "flash.wav",
      tags: ["edm", "flash", "wave", "bright", "electro"]
    },
    {
      id: 116,
      title: "Skyline Bounce",
      artist: "Freequency",
      category: "edm",
      mood: "bouncy",
      duration: 32,
      file: "skyline.wav",
      tags: ["edm", "bounce", "skyline", "fun", "club"]
    },
    {
      id: 117,
      title: "Night Voltage",
      artist: "Freequency",
      category: "edm",
      mood: "electric",
      duration: 32,
      file: "volt.wav",
      tags: ["edm", "electric", "night", "neon", "beat"]
    },
    {
      id: 118,
      title: "Laser Drift",
      artist: "Freequency",
      category: "edm",
      mood: "futuristic",
      duration: 32,
      file: "drift.wav",
      tags: ["edm", "laser", "drift", "future", "drop"]
    },
        {
      id: 119,
      title: "Velvet Echo",
      artist: "Freequency",
      category: "soul",
      mood: "smooth",
      duration: 32,
      file: "velve.wav",
      tags: ["soul", "smooth", "groove", "warm", "vintage"]
    },
    {
      id: 120,
      title: "Golden Hour Groove",
      artist: "Freequency",
      category: "soul",
      mood: "relaxed",
      duration: 32,
      file: "groove.wav",
      tags: ["soul", "chill", "groove", "sunset", "vibe"]
    },
    {
      id: 121,
      title: "Retro Touch",
      artist: "Freequency",
      category: "soul",
      mood: "nostalgic",
      duration: 32,
      file: "touch.wav",
      tags: ["soul", "retro", "nostalgia", "vintage", "classy"]
    },
    {
      id: 122,
      title: "Funky Heart",
      artist: "Freequency",
      category: "soul",
      mood: "funky",
      duration: 32,
      file: "funky.wav",
      tags: ["soul", "funk", "bass", "energy", "heart"]
    },
    {
      id: 123,
      title: "Midnight Serenade",
      artist: "Freequency",
      category: "soul",
      mood: "romantic",
      duration: 32,
      file: "serenade.wav",
      tags: ["soul", "romance", "midnight", "smooth", "melody"]
    },
    {
      id: 124,
      title: "Vibe Essence",
      artist: "Freequency",
      category: "soul",
      mood: "groovy",
      duration: 32,
      file: "essence.wav",
      tags: ["soul", "groovy", "bassline", "cool", "vibe"]
    },
    {
      id: 125,
      title: "Silk & Rhythm",
      artist: "Freequency",
      category: "soul",
      mood: "elegant",
      duration: 32,
      file: "skill.wav",
      tags: ["soul", "silky", "elegant", "smooth", "rhythm"]
    },
    {
      id: 126,
      title: "Sunset Harmony",
      artist: "Freequency",
      category: "soul",
      mood: "peaceful",
      duration: 32,
      file: "seth.wav",
      tags: ["soul", "peaceful", "sunset", "melody", "warmth"]
    },
    {
      id: 127,
      title: "Vintage Colors",
      artist: "Freequency",
      category: "soul",
      mood: "colorful",
      duration: 32,
      file: "color.wav",
      tags: ["soul", "vintage", "groove", "retro", "warm"]
    },
        {
      id: 128,
      title: "Savage Bounce",
      artist: "Freequency",
      category: "trap",
      mood: "aggressive",
      duration: 32,
      file: "savage.wav",
      tags: ["trap", "bass", "bounce", "grime", "intense"]
    },
    {
      id: 129,
      title: "Dark Alley",
      artist: "Freequency",
      category: "trap",
      mood: "dark",
      duration: 32,
      file: "alley.wav",
      tags: ["trap", "dark", "moody", "808", "street"]
    },
    {
      id: 130,
      title: "Heatwave Flow",
      artist: "Freequency",
      category: "trap",
      mood: "fierce",
      duration: 32,
      file: "heat.wav",
      tags: ["trap", "heat", "flow", "beat", "vibe"]
    },
    {
      id: 131,
      title: "Street Vision",
      artist: "Freequency",
      category: "trap",
      mood: "gritty",
      duration: 32,
      file: "visione.wav",
      tags: ["trap", "street", "gritty", "urban", "intense"]
    },
    {
      id: 132,
      title: "Mode On",
      artist: "Freequency",
      category: "trap",
      mood: "energetic",
      duration: 32,
      file: "on.wav",
      tags: ["trap", "energy", "on", "hard", "beats"]
    },
    {
      id: 133,
      title: "Flex Anthem",
      artist: "Freequency",
      category: "trap",
      mood: "bold",
      duration: 32,
      file: "flexi.wav",
      tags: ["trap", "flex", "anthem", "swagger", "beat"]
    },
    {
      id: 134,
      title: "Crimson Drip",
      artist: "Freequency",
      category: "trap",
      mood: "stylish",
      duration: 32,
      file: "dripp.wav",
      tags: ["trap", "drip", "808", "fire", "cool"]
    },
    {
      id: 135,
      title: "Blaze Runner",
      artist: "Freequency",
      category: "trap",
      mood: "fast",
      duration: 32,
      file: "blaze.wav",
      tags: ["trap", "blaze", "runner", "speed", "hard"]
    },
    {
      id: 136,
      title: "No Mercy",
      artist: "Freequency",
      category: "trap",
      mood: "raw",
      duration: 32,
      file: "mercy.wav",
      tags: ["trap", "raw", "hardcore", "aggressive", "power"]
    },
        {
      id: 137,
      title: "Crimson March",
      artist: "Freequency",
      category: "orchestral",
      mood: "heroic",
      duration: 32,
      file: "marche.wav",
      tags: ["orchestral", "march", "epic", "battle", "triumph"]
    },
    {
      id: 138,
      title: "Tears of Valor",
      artist: "Freequency",
      category: "orchestral",
      mood: "emotional",
      duration: 32,
      file: "valor.wav",
      tags: ["orchestral", "emotional", "drama", "strings", "cinematic"]
    },
    {
      id: 139,
      title: "Empire Rising",
      artist: "Freequency",
      category: "orchestral",
      mood: "powerful",
      duration: 32,
      file: "rising.wav",
      tags: ["orchestral", "epic", "rising", "cinematic", "brass"]
    },
    {
      id: 140,
      title: "The Last Horizon",
      artist: "Freequency",
      category: "orchestral",
      mood: "grand",
      duration: 32,
      file: "last.wav",
      tags: ["orchestral", "grand", "journey", "finale", "cinematic"]
    },
    {
      id: 141,
      title: "Dark Overture",
      artist: "Freequency",
      category: "orchestral",
      mood: "tense",
      duration: 32,
      file: "overture.wav",
      tags: ["orchestral", "dark", "dramatic", "overture", "suspense"]
    },
    {
      id: 142,
      title: "Eternal Light",
      artist: "Freequency",
      category: "orchestral",
      mood: "hopeful",
      duration: 32,
      file: "eternal.wav",
      tags: ["orchestral", "uplifting", "strings", "light", "cinematic"]
    },
    {
      id: 143,
      title: "Phantom Choir",
      artist: "Freequency",
      category: "orchestral",
      mood: "mystical",
      duration: 32,
      file: "choir.wav",
      tags: ["orchestral", "choir", "mystical", "epic", "haunting"]
    },
    {
      id: 144,
      title: "Throne of Storms",
      artist: "Freequency",
      category: "orchestral",
      mood: "intense",
      duration: 32,
      file: "thro.wav",
      tags: ["orchestral", "storm", "intense", "epic", "action"]
    },
    {
      id: 145,
      title: "Legacy of Kings",
      artist: "Freequency",
      category: "orchestral",
      mood: "majestic",
      duration: 32,
      file: "king.wav",
      tags: ["orchestral", "majestic", "regal", "cinematic", "epic"]
    },
        {
      id: 146,
      title: "Midnight Lounge",
      artist: "Freequency",
      category: "jazz",
      mood: "smooth",
      duration: 32,
      file: "lounge.wav",
      tags: ["jazz", "smooth", "lounge", "late night", "chill"]
    },
    {
      id: 147,
      title: "Coffee & Sax",
      artist: "Freequency",
      category: "jazz",
      mood: "warm",
      duration: 32,
      file: "sax.wav",
      tags: ["jazz", "saxophone", "coffee", "warm", "relaxed"]
    },
    {
      id: 148,
      title: "Golden Keys",
      artist: "Freequency",
      category: "jazz",
      mood: "cozy",
      duration: 32,
      file: "keys.wav",
      tags: ["jazz", "piano", "cozy", "soft", "downtempo"]
    },
    {
      id: 149,
      title: "Rainy Day Swing",
      artist: "Freequency",
      category: "jazz",
      mood: "nostalgic",
      duration: 32,
      file: "swing.wav",
      tags: ["jazz", "swing", "rain", "mellow", "retro"]
    },
    {
      id: 150,
      title: "Velvet Groove",
      artist: "Freequency",
      category: "jazz",
      mood: "groovy",
      duration: 32,
      file: "grive.wav",
      tags: ["jazz", "groove", "bass", "chill", "night"]
    },
    {
      id: 151,
      title: "Candlelight Jam",
      artist: "Freequency",
      category: "jazz",
      mood: "romantic",
      duration: 32,
      file: "jam.wav",
      tags: ["jazz", "romantic", "intimate", "smooth", "soft"]
    },
    {
      id: 152,
      title: "Sunset Stroll",
      artist: "Freequency",
      category: "jazz",
      mood: "laid-back",
      duration: 32,
      file: "stroll.wav",
      tags: ["jazz", "sunset", "calm", "vibes", "relaxed"]
    },
    {
      id: 153,
      title: "Urban Sketches",
      artist: "Freequency",
      category: "jazz",
      mood: "modern",
      duration: 32,
      file: "urbann.wav",
      tags: ["jazz", "city", "modern", "cool", "beats"]
    },
    {
      id: 154,
      title: "Sapphire Smoke",
      artist: "Freequency",
      category: "jazz",
      mood: "mysterious",
      duration: 32,
      file: "sapphire.wav",
      tags: ["jazz", "smoky", "mystery", "late night", "smooth"]
    },
        {
      id: 155,
      title: "Mountain Breeze",
      artist: "Freequency",
      category: "nature",
      mood: "refreshing",
      duration: 32,
      file: "breeze.wav",
      tags: ["nature", "wind", "mountain", "fresh", "calm"]
    },
    {
      id: 156,
      title: "Forest Whisper",
      artist: "Freequency",
      category: "nature",
      mood: "soothing",
      duration: 32,
      file: "whisp.wav",
      tags: ["nature", "forest", "leaves", "calm", "ambient"]
    },
    {
      id: 157,
      title: "Rainfall Rhythms",
      artist: "Freequency",
      category: "nature",
      mood: "relaxing",
      duration: 32,
      file: "rain.wav",
      tags: ["nature", "rain", "drizzle", "soothing", "sleep"]
    },
    {
      id: 158,
      title: "Desert Mirage",
      artist: "Freequency",
      category: "nature",
      mood: "warm",
      duration: 32,
      file: "desert.wav",
      tags: ["nature", "desert", "wind", "sun", "atmospheric"]
    },
    {
      id: 159,
      title: "Jungle Echoes",
      artist: "Freequency",
      category: "nature",
      mood: "wild",
      duration: 32,
      file: "jungle.wav",
      tags: ["nature", "jungle", "echo", "birds", "natural"]
    },
    {
      id: 160,
      title: "Crystal Creek",
      artist: "Freequency",
      category: "nature",
      mood: "pure",
      duration: 32,
      file: "creek.wav",
      tags: ["nature", "creek", "water", "tranquil", "relax"]
    },
    {
      id: 161,
      title: "Snowfall Silence",
      artist: "Freequency",
      category: "nature",
      mood: "quiet",
      duration: 32,
      file: "snoww.wav",
      tags: ["nature", "snow", "silence", "winter", "peaceful"]
    },
    {
      id: 162,
      title: "Thunder Plains",
      artist: "Freequency",
      category: "nature",
      mood: "dramatic",
      duration: 32,
      file: "thunder.wav",
      tags: ["nature", "storm", "rain", "thunder", "moody"]
    },
    {
      id: 163,
      title: "Meadow Dawn",
      artist: "Freequency",
      category: "nature",
      mood: "gentle",
      duration: 32,
      file: "dawne.wav",
      tags: ["nature", "meadow", "birds", "sunrise", "gentle"]
    },
        {
      id: 164,
      title: "Neon Pulse",
      artist: "Freequency",
      category: "trance",
      mood: "energetic",
      duration: 32,
      file: "nepone.wav",
      tags: ["trance", "neon", "pulse", "club", "energy"]
    },
    {
      id: 165,
      title: "Dreamstate",
      artist: "Freequency",
      category: "trance",
      mood: "hypnotic",
      duration: 32,
      file: "state.wav",
      tags: ["trance", "dream", "hypnotic", "ambient", "melodic"]
    },
    {
      id: 166,
      title: "Euphoria Drive",
      artist: "Freequency",
      category: "trance",
      mood: "euphoric",
      duration: 32,
      file: "euphoria.wav",
      tags: ["trance", "euphoria", "drive", "uplift", "rave"]
    },
    {
      id: 167,
      title: "Celestial Waves",
      artist: "Freequency",
      category: "trance",
      mood: "spacey",
      duration: 32,
      file: "celes.wav",
      tags: ["trance", "celestial", "waves", "space", "ambient"]
    },
    {
      id: 168,
      title: "Ascend Realm",
      artist: "Freequency",
      category: "trance",
      mood: "uplifting",
      duration: 32,
      file: "realm.wav",
      tags: ["trance", "uplift", "rise", "melodic", "elevate"]
    },
    {
      id: 169,
      title: "Mirage Circuit",
      artist: "Freequency",
      category: "trance",
      mood: "intense",
      duration: 32,
      file: "circuit.wav",
      tags: ["trance", "mirage", "circuit", "tech", "deep"]
    },
    {
      id: 170,
      title: "Spectrum Glow",
      artist: "Freequency",
      category: "trance",
      mood: "radiant",
      duration: 32,
      file: "spectrum.wav",
      tags: ["trance", "glow", "colorful", "light", "melodic"]
    },
    {
      id: 171,
      title: "Orbit Drift",
      artist: "Freequency",
      category: "trance",
      mood: "floating",
      duration: 32,
      file: "orby.wav",
      tags: ["trance", "orbit", "drift", "space", "progressive"]
    },
    {
      id: 172,
      title: "Pulse Horizon",
      artist: "Freequency",
      category: "trance",
      mood: "driving",
      duration: 32,
      file: "pulsar.wav",
      tags: ["trance", "pulse", "horizon", "driving", "uplifting"]
    }

  ]

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Genres', icon: Music },
    { id: 'electronic', name: 'Electronic', icon: Volume2 },
    { id: 'acoustic', name: 'Acoustic', icon: Music },
    { id: 'corporate', name: 'Corporate', icon: Tag },
    { id: 'hip-hop', name: 'Hip Hop', icon: Volume2 },
    { id: 'ambient', name: 'Ambient', icon: Music },
    { id: 'rock', name: 'Rock', icon: Volume2 },
    { id: 'lofi', name: 'Lofi', icon: Volume2 },
    { id: 'cinematic', name: 'Cinematic', icon: Volume2 },
    { id: 'synthwave', name: 'Synthwave', icon: Volume2 },
    { id: 'new age', name: 'New Age', icon: Volume2 },
    { id: 'edm', name: 'EDM', icon: Volume2 },
    { id: 'soul', name: 'Soul', icon: Volume2 },
    { id: 'trap', name: 'Trap', icon: Volume2 },
    { id: 'orchestral', name: 'Orchestral', icon: Volume2 },
    { id: 'jazz', name: 'Jazz', icon: Volume2 },
    { id: 'nature', name: 'Nature', icon: Volume2 },
    { id: 'trance', name: 'Trance', icon: Volume2 }
  ]

  // Filter music based on search term and category
  const filteredMusic = musicData.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || track.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Audio playback functions
  const playTrack = (track) => {
    if (currentlyPlaying?.id === track.id && isPlaying) {
      // Pause current track
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Play new track or resume
      if (currentlyPlaying?.id !== track.id) {
        setCurrentlyPlaying(track)
        audioRef.current.src = `/audio/${track.file}`
      }
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // Download function
  const downloadTrack = (track) => {
    const link = document.createElement('a')
    link.href = `/audio/${track.file}`
    link.download = `${track.title} - ${track.artist}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentlyPlaying])

  // Format time display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                <Music className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Freequency
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Royalty-Free Music Library</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Perfect for Social Media</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Reels • Stories • Content</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search music by title or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-all duration-200 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                      : 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Music Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusic.map((track) => (
            <Card key={track.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {track.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      by {track.artist}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                    {track.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Track Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{track.duration}s</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <span className="capitalize">{track.mood}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {track.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                      {tag}
                    </Badge>
                  ))}
                  {track.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      +{track.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Progress Bar (only show for currently playing track) */}
                {currentlyPlaying?.id === track.id && (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => playTrack(track)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {currentlyPlaying?.id === track.id && isPlaying ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {currentlyPlaying?.id === track.id && isPlaying ? 'Pause' : 'Preview'}
                  </Button>
                  
                  <Button
                    onClick={() => downloadTrack(track)}
                    variant="outline"
                    className="px-4 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20 transition-all duration-200"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMusic.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No tracks found</h3>
            <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              All music is royalty-free and perfect for social media content
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Download • Use • Create • Share
            </p>
          </div>
        </footer>
      </div>

      {/* Hidden Audio Element for Playback */}
      <audio ref={audioRef} />
    </div>
  )
}

export default App

