// YouTube Video Downloader App - Real Backend Integration
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api/download'
  : 'https://youtube-video-downloader-api.vercel.app/api/download';

class YouTubeDownloader {
  constructor() {
    this.videoUrl = '';
    this.videoData = null;
    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    this.urlInput = document.getElementById('videoUrl');
    this.fetchBtn = document.getElementById('fetchBtn');
    this.videoInfo = document.getElementById('videoInfo');
    this.qualitySection = document.getElementById('qualitySection');
    this.qualityGrid = document.getElementById('qualityGrid');
    this.loadingSpinner = document.getElementById('loadingSpinner');
    this.errorMessage = document.getElementById('errorMessage');
    this.successMessage = document.getElementById('successMessage');
  }

  attachEventListeners() {
    this.fetchBtn.addEventListener('click', () => this.handleFetchVideo());
    this.urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleFetchVideo();
    });
  }

  handleFetchVideo() {
    const url = this.urlInput.value.trim();
    if (!url) {
      this.showError('Please enter a YouTube URL');
      return;
    }
    if (!this.isValidYouTubeUrl(url)) {
      this.showError('Please enter a valid YouTube URL');
      return;
    }
    this.fetchVideoData(url);
  }

  isValidYouTubeUrl(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//;
    return youtubeRegex.test(url);
  }

  fetchVideoData(url) {
    this.showLoading(true);
    this.clearMessages();

    fetch(`${API_URL}?url=${encodeURIComponent(url)}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        this.videoData = {
          id: data.id || data.title.substring(0, 10),
          title: data.title || 'Unknown Video',
          channel: data.author || 'Unknown Channel',
          duration: data.duration ? this.formatDuration(data.duration) : 'Unknown',
          thumbnail: data.thumbnail || 'https://via.placeholder.com/320x180?text=No+Thumbnail',
          formats: (data.formats || []).map(f => ({
            quality: f.quality_label || f.format_name || 'Unknown',
            format: f.ext || 'mp4',
            size: this.formatFileSize(f.filesize),
            url: f.url,
            filesize: f.filesize
          }))
        };

        if (this.videoData.formats.length === 0) {
          this.showError('No download formats available for this video');
          this.showLoading(false);
          return;
        }

        this.displayVideoInfo();
        this.displayQualityOptions();
        this.showSuccess('✅ Video loaded! Select quality and download.');
        this.showLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        this.showError('Failed to fetch video: ' + error.message);
        this.showLoading(false);
      });
  }

  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  formatFileSize(bytes) {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(1) + 'MB';
  }

  displayVideoInfo() {
    document.getElementById('videoTitle').textContent = this.videoData.title;
    document.getElementById('videoChannel').textContent = `Channel: ${this.videoData.channel}`;
    document.getElementById('videoDuration').textContent = `Duration: ${this.videoData.duration}`;
    document.getElementById('videoThumbnail').src = this.videoData.thumbnail;
    this.videoInfo.classList.remove('hidden');
  }

  displayQualityOptions() {
    this.qualityGrid.innerHTML = '';
    this.videoData.formats.forEach((format) => {
      const card = document.createElement('div');
      card.className = 'quality-card';
      card.innerHTML = `
        <div class="quality-label">${format.quality}</div>
        <div class="quality-format">${format.format.toUpperCase()}</div>
        <div class="quality-format" style="font-size:0.8em;color:#999;">${format.size}</div>
      `;
      card.addEventListener('click', () => this.handleDownload(format));
      this.qualityGrid.appendChild(card);
    });
    this.qualitySection.classList.remove('hidden');
  }

  handleDownload(format) {
    if (!format.url) {
      this.showError('Download URL not available for this format');
      return;
    }
    
    try {
      // Open download in new tab
      window.open(format.url, '_blank');
      this.showSuccess(`✅ Download started: ${format.quality} ${format.format.toUpperCase()}`);
    } catch (error) {
      this.showError('Failed to start download: ' + error.message);
    }
  }

  showLoading(show) {
    this.loadingSpinner.classList.toggle('hidden', !show);
  }

  showError(message) {
    this.errorMessage.textContent = '❌ ' + message;
    this.errorMessage.classList.remove('hidden');
  }

  showSuccess(message) {
    this.successMessage.textContent = message;
    this.successMessage.classList.remove('hidden');
  }

  clearMessages() {
    this.errorMessage.classList.add('hidden');
    this.successMessage.classList.add('hidden');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new YouTubeDownloader());
} else {
  new YouTubeDownloader();
}

console.log('%cYouTube Video Downloader - Real Backend Edition', 'color: #667eea; font-size: 20px;');
console.log('%cConnecting to: ' + API_URL, 'color: #764ba2;');
