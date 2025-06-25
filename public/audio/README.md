# Audio Files Directory

## How to Add Your Music Files

To add your own royalty-free music to the website, follow these steps:

### 1. File Placement
- Place all your audio files in this directory: `/public/audio/`
- Supported formats: MP3, WAV, OGG
- Recommended: MP3 format for best web compatibility

### 2. File Naming
- Use descriptive, web-friendly filenames
- Avoid spaces (use hyphens or underscores instead)
- Examples: 
  - `upbeat-electronic.mp3`
  - `chill_acoustic.wav`
  - `corporate-motivational.mp3`

### 3. Update the Music Data
After adding your files, you need to update the music data in the code:

1. Open `/src/App.jsx`
2. Find the `musicData` array (around line 20)
3. Add or modify entries following this format:

```javascript
{
  id: 7, // Unique number
  title: "Your Track Title",
  artist: "Your Artist Name", // Usually "SoundVault" or your brand
  category: "genre", // electronic, acoustic, corporate, hip-hop, ambient, rock
  mood: "feeling", // energetic, relaxed, inspiring, cool, dreamy, powerful
  duration: 30, // Length in seconds
  file: "your-filename.mp3", // Must match the actual filename
  tags: ["tag1", "tag2", "tag3", "tag4"] // Searchable keywords
}
```

### 4. Categories Available
- electronic
- acoustic  
- corporate
- hip-hop
- ambient
- rock

You can add new categories by updating the `categories` array in App.jsx

### 5. Example File Structure
```
/public/audio/
├── upbeat-electronic.mp3
├── chill-acoustic.mp3
├── corporate-motivational.mp3
├── hip-hop-beat.mp3
├── ambient-dreamy.mp3
└── rock-energy.mp3
```

### 6. Testing
After adding files and updating the data:
1. Save your changes
2. The development server will automatically reload
3. Test the preview and download functionality
4. Make sure all files play correctly

### Notes
- Keep file sizes reasonable (under 2MB per track recommended)
- 30-second clips are ideal for social media use
- Ensure all music is truly royalty-free before publishing
- Consider adding metadata tags to your audio files for better organization

