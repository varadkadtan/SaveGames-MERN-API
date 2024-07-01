import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar';
import { Game } from './types';
import { Routes, Route } from 'react-router-dom';
import MyGames from './components/MyGames';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showRefreshMessage, setShowRefreshMessage] = useState(false); // State for showing refresh message

  useEffect(() => {
    const fetchFromMobyGames = async () => {
      try {
        const response = await axios.get('https://savegames-mern-api.onrender.com/fetch-games');
        setGames(response.data);
        setFilteredGames(response.data);

        const allCategories = response.data.reduce((acc: string[], game: Game) => {
          game.genres.forEach((genre) => {
            if (!acc.includes(genre.genre_name)) {
              acc.push(genre.genre_name);
            }
          });
          return acc;
        }, []);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching games from MobyGames:', error);
        setError('Failed to fetch games. Please try again later.');
      }
    };

    fetchFromMobyGames();
  }, []);

  useEffect(() => {
    let filtered = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter((game) =>
        game.genres.some((genre) => genre.genre_name === selectedCategory)
      );
    }

    setFilteredGames(filtered);
  }, [searchTerm, selectedCategory, games]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddGame = async (game: Game) => {
    try {
      const response = await axios.post('https://savegames-mern-api.onrender.com/add-game', game);
      console.log('Game added:', response.data);
      setShowRefreshMessage(true); // Show refresh message
      // Automatically dismiss message after 5 seconds
      setTimeout(() => setShowRefreshMessage(false), 5000);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<MyGames />} />
        {/* Add more routes as needed */}
      </Routes>
      <h1 className="title">Game List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="category-filter">
          <span>Filter by Category:</span>
          <select value={selectedCategory} onChange={handleCategoryFilter} className="category-select">
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="my-games-container">
          <div className="games-grid">
            {filteredGames.map((game) => (
              <div key={game.game_id} className="game-card">
                <div className="game-details">
                  <h2 className="game-title">{game.title.length > 30 ? `${game.title.slice(0, 30)}...` : game.title}</h2>
                  <p className="game-info">
                    <strong>Genres:</strong> {game.genres.map((genre) => genre.genre_name).join(', ')}
                  </p>
                  <p className="game-info">
                    <strong>Release Date:</strong> {game.platforms[0]?.first_release_date}
                  </p>
                  {game.sample_cover && (
                    <div className="image-container">
                      <img
                        src={game.sample_cover.image}
                        alt={`${game.title} Cover`}
                        className="game-thumbnail"
                      />
                    </div>
                  )}
                </div>
                <button className="add-button" onClick={() => handleAddGame(game)}>
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Refresh message */}
      {showRefreshMessage && (
        <div className="refresh-message">
          <p>Please refresh to see your Saved Games</p>
          {/* Optional dismiss button */}
          <button onClick={() => setShowRefreshMessage(false)} className="dismiss-button">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
