// YouTube Video Downloader App
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
        setTimeout(() => {
            try {
                const videoId = this.extractVideoId(url);
                this.videoData = {
                    id: videoId,
                    title: 'Sample Video',
                    channel: 'Sample Channel',
                    duration: '10:30',
                    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                    formats: [
                        { quality: '720p', format: 'mp4', size: '125MB' },
                        { quality: '480p', format: 'mp4', size: '65MB' },
                        { quality: '360p', format: 'mp4', size: '45MB' },
                        { quality: '128kbps', format: 'mp3', size: '10MB' }
                    ]
                };
                this.displayVideoInfo();
                this.displayQualityOptions();
                this.showSuccess('Video loaded! Select quality and download.');
            } catch (error) {
                this.showError('Failed to fetch video.');
            }
            this.showLoading(false);
        }, 1000);
    }

    extractVideoId(url) {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
            /youtube\.com\/embed\/([^&\n?#]+)/
        ];
        for (let pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) return match[1];
        }
        return 'dQw4w9WgXcQ';
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
            card.innerHTML = `<div class=\"quality-label\">${format.quality}</div><div class=\"quality-format\">${format.format.toUpperCase()}</div><div class=\"quality-format\" style=\"font-size:0.8em;color:#999;\">${format.size}</div>`;
            card.addEventListener('click', () => this.handleDownload(format));
            this.qualityGrid.appendChild(card);
        });
        this.qualitySection.classList.remove('hidden');
    }

    handleDownload(format) {
        this.showSuccess(`Download initiated: ${format.quality} ${format.format.toUpperCase()}`);
    }

    showLoading(show) {
        this.loadingSpinner.classList.toggle('hidden', !show);
    }

    showError(message) {
        this.errorMessage.textContent = '❌ ' + message;
        this.errorMessage.classList.remove('hidden');
    }

    showSuccess(message) {
        this.successMessage.textContent = '✅ ' + message;
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

console.log('%cYouTube Video Downloader', 'color: #667eea; font-size: 20px;');
console.log('%cReady to download!', 'color: #764ba2;');
