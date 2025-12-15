const express = require('express');
const router = express.Router();
const Track = require('../models/track');
const { ROLES, PRO_OPTIONS, DAW_OPTIONS} = require('../config/constants');

// GET /tracks
router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find({ owner: req.session.user._id });
        res.render('tracks/index.ejs', { tracks });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//GET /tracks/new
router.get('/new', (req, res) => {
    res.render('tracks/new.ejs');
});

//POST /tracks - create new track
router.post('/', async (req, res) => {
    try {
        const trackData = {
            ...req.body,
            owner: req.session.user._id
        };
        await Track.create(trackData);
        res.redirect('/tracks');
    }catch (error) {
        console.log(error);
        res.redirect('/tracks/new');
    }
});

// GET /tracks/:id/collaborators/new
router.get('/:id/collaborators/new', async (req, res) => {
    const track =await Track.findById(req.params.id);
    res.render('tracks/collaborators/new.ejs', { track });
});

// POST /tracks/:id/collaborators Create
router.post('/:id/collaborators', async (req, res) => {
    const track = await Track.findById(req,params.id);
    track.collaborators.push(req.body);
    await track.save();
    req.redirect('/tracks/' + req.params.id);
});

//GET /tracks/:id/collaborators/:collabId/edit Show
router.get('/:id/collaborators/:collabId/edit', async (req, res) => {
        const track = await Track.findById(req,params.id);
        const collaborator = track.collaborators.id(req.params.collabId);
        res.render('tracks/collaborators/edit.ejs', { track, collaborator });
});

//PUT /tracks/:id/collaborators/:collabId Update
router.put('/:id/collaborators/:collabId', async (req, res) => {
        const track = await Track.findById(req,params.id);
        const collaborator = track.collaborators.id(req.params.collabId);
        Object.assign(collaborator, req.body);
        await track.save();
        res.redirect('/tracks/', + req.params.id);
});

//DELETE /tracks/:id/collaborators/:collabId Delete
router.delete('/:id/collaborators/:collabId', async (req, res) => {
         const track = await Track.findById(req,params.id);
        track.collaborators.pull({ _id: req.params.collabId });
        await track.save('/tracks/' + req.params.id);
})
//GET /tracks/:id
router.get('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        res.render('tracks/show.ejs', { track });
    } catch (error) {
        console.log(error);
        res.redirect('/tracks');
    }
});

//GET /tracks/:id/edit
router.get('/:id/edit', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        res.render('tracks/show.ejs', { track });
    } catch (error) {
        console.log(error);
        res.redirect('/tracks');
    }
});

//PUT /tracks/:id
router.put('/:id/', async (req, res) => {
    try {
        await Track.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/tracks/', req.params.id);
    } catch (error) {
        console.log(error);
        res.redirect('/tracks');
    }
});

//DELETE /tracks/:id
router.delete('/:id', async (req, res) => {
    try {
        await Track.findByIdAndDelete(req.params.id);
        res.redirect('/tracks');
    } catch (error) {
        console.log(error);
        res.redirect('/tracks');
    }
});

module.exports = router