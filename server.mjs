import express from 'express';
import cors from 'cors';
import axios from 'axios';
import mongoose from 'mongoose';

const app = express();
const port = 5000;


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://varadkadtan:january302003@cluster.sviazxr.mongodb.net/gameDB?retryWrites=true&w=majority&appName=Cluster';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const gameSchema = new mongoose.Schema({
  game_id: { type: String, unique: true },
  title: String,
  genre_category: String,
  first_release_date: String,
  sample_cover: {
    height: Number,
    image: String,
    platforms: [String],
    thumbnail_image: String,
    width: Number
  },
  favourite: { type: Boolean, default: false }
});

// Create Game model from schema
const GameModel = mongoose.model('Game', gameSchema);

// Endpoint to fetch games from MongoDB
app.get('/api/games', async (req, res) => {
  try {
    const games = await GameModel.find();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games from MongoDB' });
  }
});

// Endpoint to fetch games from MobyGames API
app.get('/fetch-games', async (req, res) => {
  try {
    const response = await axios.get('https://api.mobygames.com/v1/games', {
      params: {
        api_key: 'moby_5STJcSHIPsUDGqJMYWNSoeOpfTg'
      }
    });

    // Extract relevant data from the API response
    const games = response.data.games; // Assuming the response structure includes a 'games' array

    res.json(games);
  } catch (error) {
    console.error('Error fetching games from MobyGames:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add a game to MongoDB
app.post('/add-game', async (req, res) => {
  try {
    const gameData = req.body;

    // Ensure game_id is unique and not null
    if (!gameData.game_id) {
      return res.status(400).json({ error: 'game_id is required' });
    }

    const newGame = new GameModel(gameData);
    await newGame.save();

    res.status(201).json({ message: 'Game added successfully', game: newGame });
  } catch (error) {
    console.error('Game is already saved:', error);
    res.status(500).json({ error: 'Failed to add game' });
  }
});

// Endpoint to delete a game from MongoDB
app.delete('/api/games/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const deletedGame = await GameModel.findByIdAndDelete(gameId);
    
    if (!deletedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json({ message: 'Game deleted successfully', game: deletedGame });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Failed to delete game' });
  }
});

app.post('/api/games/:id/favourite', async (req, res) => {
  try {
    const gameId = req.params.id;
    const updatedGame = await GameModel.findByIdAndUpdate(gameId, { favourite: true }, { new: true });
    
    if (!updatedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json({ message: 'Game marked as favourite', game: updatedGame });
  } catch (error) {
    console.error('Error marking game as favourite:', error);
    res.status(500).json({ error: 'Failed to mark game as favourite' });
  }
});

// Endpoint to unmark a game as favourite
app.post('/api/games/:id/unfavourite', async (req, res) => {
  try {
    const gameId = req.params.id;
    const updatedGame = await GameModel.findByIdAndUpdate(gameId, { favourite: false }, { new: true });
    
    if (!updatedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json({ message: 'Game unmarked as favourite', game: updatedGame });
  } catch (error) {
    console.error('Error unmarking game as favourite:', error);
    res.status(500).json({ error: 'Failed to unmark game as favourite' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

