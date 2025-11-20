const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path'); // Import 'path' module

// THE FIX: Force dotenv to look in the current directory
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); 

const app = express();
const PORT = process.env.PORT || 5000;

// DEBUGGING: Add this temporarily to check if it loaded
console.log("DEBUG - Key Loaded:", process.env.RAPID_API_KEY ? "YES" : "NO");

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('InstaFetch API (RapidAPI Version) is running.');
});

app.get('/api/download', async (req, res) => {
    const { url } = req.query;

    if (!url || !url.includes('instagram.com')) {
        return res.status(400).json({ error: 'Invalid Instagram URL' });
    }

    try {
        console.log(`Fetching via RapidAPI: ${url}`);

        // ---------------------------------------------------------------
        // STEP 1: CONFIGURATION
        // ---------------------------------------------------------------
        
        const options = {
            method: 'GET',
            url: 'https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert',
            params: {
                url: url 
            },
            headers: {
                'x-rapidapi-key': process.env.RAPID_API_KEY,
                'x-rapidapi-host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);
        const data = response.data;
        
        console.log("API Response:", JSON.stringify(data, null, 2));

        // ---------------------------------------------------------------
        // STEP 2: MAPPING THE DATA (UPDATED FOR YOUR API)
        // ---------------------------------------------------------------
        
        let videoUrl = null;
        let thumbnail = null;
        let author = 'Instagram User';

        // Strategy for your specific API response: { "media": [ { "url": "..." } ] }
        if (data.media && Array.isArray(data.media) && data.media.length > 0) {
            const mediaItem = data.media[0];
            videoUrl = mediaItem.url;
            thumbnail = mediaItem.thumbnail;
        }
        // Fallback strategies for other APIs
        else if (data.url) {
            videoUrl = data.url;
        } 
        else if (Array.isArray(data) && data.length > 0 && data[0].url) {
            videoUrl = data[0].url;
        }

        // Default thumbnail if API didn't provide one
        if (!thumbnail) {
            thumbnail = data.thumb || 'https://placehold.co/600x400?text=Media+Found';
        }

        if (videoUrl) {
            res.json({
                type: 'video',
                downloadUrl: videoUrl,
                thumbnail: thumbnail,
                author: author,
                success: true
            });
        } else {
            throw new Error('API connected but could not extract video URL from the response.');
        }

    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'Failed to fetch media.',
            details: error.message,
            tip: 'Check the terminal logs to see the API response structure.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});