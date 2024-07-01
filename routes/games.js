const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// @route   GET /api/games
// @desc    Get all games
// @access  Public
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/games
// @desc    Add a new game
// @access  Public
router.post('/', async (req, res) => {
  const { game_id, title, sample_cover } = req.body;

  try {
    let game = await Game.findOne({ game_id });

    if (game) {
      return res.status(400).json({ msg: 'Game already exists' });
    }

    game = new Game({
      game_id,
      title,
      sample_cover
    });

    await game.save();
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add more routes for PUT, DELETE operations as needed

module.exports = router;

