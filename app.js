import express from 'express';
import fetch from 'node-fetch';

import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Define API route to fetch TMDB data
app.get('/tmdb', async (req, res) => {
    try {
        const apiKey = process.env.TMDB_API_KEY;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Error fetching data from TMDB API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
