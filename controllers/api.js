const express = require('express');
const router = express.Router();
const deezer = require('../services/deezer');

router.get('/deezer/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json({error: 'Query required', data: [] });
        }
        const tracks = await deezer. searchTracks(query);
        res.json({ data: tracks }); 
    } catch (error) {
        console.log (error);
        res.json({error: 'Search failed', data: [] });
    }
});

//GET api/deezer/track/:id
router.get('/deezer/track/:id', async (req, res) => {
    try {
        const track = await deezer.getTrack(req.params.id);
        res.json(track);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Failed to get track'});
    }
});

//GET /api/deezer/artist/:id
router.get('/deezer/artist/:id', async (req, res) => {
    try {
        const track = await deezer.getArtist(req.params.id);
        res.json(track);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Failed to find artist'});
    }
});

module.exports = router;