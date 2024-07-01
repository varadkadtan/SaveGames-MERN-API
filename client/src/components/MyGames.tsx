import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

interface Game {
  _id: string;
  title: string;
  sample_cover: {
    thumbnail_image: string;
  };
  favourite: boolean;
}

const MyGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [showRemoveMessage, setShowRemoveMessage] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get<Game[]>('https://savegames-mern-api.onrender.com/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchGames();
  }, []);

  const deleteGame = async (gameId: string) => {
    try {
      await axios.delete(`https://savegames-mern-api.onrender.com/api/games/${gameId}`);
      setGames(games.filter((game) => game._id !== gameId));
      setShowRemoveMessage(true);

      // Hide message after 3 seconds
      setTimeout(() => {
        setShowRemoveMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const markAsFavourite = async (gameId: string) => {
    try {
      await axios.post(`https://savegames-mern-api.onrender.com/api/games/${gameId}/favourite`);
      setGames((games) =>
        games.map((game) => (game._id === gameId ? { ...game, favourite: true } : game))
      );
    } catch (error) {
      console.error('Error marking game as favourite:', error);
    }
  };

  const unmarkAsFavourite = async (gameId: string) => {
    try {
      await axios.post(`https://savegames-mern-api.onrender.com/api/games/${gameId}/unfavourite`);
      setGames((games) =>
        games.map((game) => (game._id === gameId ? { ...game, favourite: false } : game))
      );
    } catch (error) {
      console.error('Error unmarking game as favourite:', error);
    }
  };

  return (
    <div className="my-games-container">
      <h1 className="header">Scroll to Add Games</h1>
      <div className="header">
      <h1 className="title">My Saved Games</h1>
      
      </div>
      <div className="games-grid">
        {games.length === 0 ? (
          <div className="no-games">
            <h2>No Games Saved</h2>
          </div>
        ) : (
          games.map((game) => (
            <div key={game._id} className={`game-card ${game.favourite ? 'favourite' : ''}`}>
              <div className="game-info">
                <h3>{game.title}</h3>
                <div className="image-container">
                  <img src={game.sample_cover.thumbnail_image} alt={game.title} className="game-image" />
                </div>
              </div>
              <div className="button-container">
                <button onClick={() => deleteGame(game._id)} className="delete-button">
                  Remove
                </button>
                {game.favourite ? (
                  <button onClick={() => unmarkAsFavourite(game._id)} className="favourite-button unfavourite">
                    Unfavourite
                  </button>
                ) : (
                  <button onClick={() => markAsFavourite(game._id)} className="favourite-button favourite">
                    Favourite
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {showRemoveMessage && (
        <div className="refresh-message">
          <p>Game has been removed</p>
        </div>
      )}
    </div>
  );
};

export default MyGames;


