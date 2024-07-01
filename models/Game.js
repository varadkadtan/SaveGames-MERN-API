const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  game_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  sample_cover: {
    image: String,
    thumbnail_image: String
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Game', gameSchema);
