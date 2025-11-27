import fetch from 'node-fetch';

const RAPIDAPI_KEY = process.env.YOUTUBE_DL_API_KEY || '';
const RAPIDAPI_HOST = 'youtube-video-download-info.p.rapidapi.com';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { url, quality } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  try {
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST
      }
    };
    
    const response = await fetch(`https://${RAPIDAPI_HOST}?url=${encodeURIComponent(url)}`, options);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch video info' });
    }
    
    const data = await response.json();
    
    // Extract download links based on quality preference
    const downloadLinks = data.formats || [];
    let selectedFormat = downloadLinks[0]; // Default to first available
    
    if (quality) {
      selectedFormat = downloadLinks.find(f => f.quality_label?.includes(quality)) || downloadLinks[0];
    }
    
    res.status(200).json({
      title: data.title || 'Video',
      author: data.author || 'Unknown',
      duration: data.length_seconds || 0,
      thumbnail: data.thumbnail || '',
      downloadUrl: selectedFormat?.url || null,
      quality: selectedFormat?.quality_label || 'Unknown',
      filesize: selectedFormat?.filesize || 0,
      formats: downloadLinks
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to process download', details: error.message });
  }
}
