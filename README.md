# YouTube Video Downloader

> A modern, lightning-fast web application to download YouTube videos in multiple quality formats with a beautiful, intuitive UI.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

## ✨ Features

- 🚀 **Fast & Efficient** - Lightning-fast video processing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎬 **Multiple Formats** - Download in various quality options (MP4, WebM)
- 🎵 **Audio Extraction** - Extract audio as MP3
- 🎨 **Beautiful UI** - Modern, intuitive interface
- ⚡ **No Registration** - Use without creating an account
- 🔒 **Secure** - All processing done client-side
- 🌐 **Cross-Browser** - Works on all modern browsers

## 🚀 Live Demo

Visit the live application: [YouTube Video Downloader](https://snakeeye-sudo.github.io/youtube-video-downloader)

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 💻 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: youtube-dl.js / yt-dlp
- **Deployment**: GitHub Pages
- **Build Tools**: None required (works out of the box)

## 📦 Installation

### Option 1: Use the Web App

Simply visit: [YouTube Video Downloader](https://snakeeye-sudo.github.io/youtube-video-downloader)

### Option 2: Clone and Run Locally

```bash
# Clone the repository
git clone https://github.com/SnakeEye-sudo/youtube-video-downloader.git

# Navigate to the project directory
cd youtube-video-downloader

# Open index.html in your browser
# You can use any local server, for example:
python -m http.server 8000
# Then visit http://localhost:8000
```

### Option 3: NPM Package

```bash
npm install youtube-video-downloader
```

## 🎯 Usage

1. **Paste YouTube URL** - Enter the YouTube video URL in the input field
2. **Select Quality** - Choose your preferred video quality/format
3. **Download** - Click the download button
4. **Save** - The video will automatically download to your device

### Supported Formats:
- **Video**: 720p, 480p, 360p, 240p (MP4)
- **Audio**: MP3 (128kbps, 192kbps, 256kbps)

## 🛠️ Development

### Project Structure

```
youtube-video-downloader/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling
├── js/
│   ├── app.js          # Main application logic
│   └── utils.js        # Utility functions
├── assets/             # Images and icons
└── README.md          # This file
```

### Getting Started with Development

```bash
# Clone the repository
git clone https://github.com/SnakeEye-sudo/youtube-video-downloader.git
cd youtube-video-downloader

# Install dependencies (if any)
npm install

# Start development server
npm start
```

## 📝 API Documentation

### Main Functions

#### `downloadVideo(url, quality)`
Downloads a video from the provided YouTube URL with the specified quality.

```javascript
downloadVideo('https://www.youtube.com/watch?v=VIDEO_ID', '720p');
```

#### `extractAudio(url, format)`
Extracts audio from a YouTube video.

```javascript
extractAudio('https://www.youtube.com/watch?v=VIDEO_ID', 'mp3');
```

## 🐛 Troubleshooting

### Issue: Video won't download
- **Solution**: Ensure the YouTube URL is valid and the video is publicly accessible

### Issue: Slow download speed
- **Solution**: Check your internet connection or try a lower quality option

### Issue: Format not supported
- **Solution**: Currently supports MP4 and WebM formats. Try a different quality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**SnakeEye (Er. Sangam Krishna)**
- GitHub: [@SnakeEye-sudo](https://github.com/SnakeEye-sudo)
- Portfolio: [SnakeEye.dev](https://snakeeye-sudo.github.io)

## 📞 Support

If you have any questions or need support, please open an [Issue](https://github.com/SnakeEye-sudo/youtube-video-downloader/issues)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ by SnakeEye**
