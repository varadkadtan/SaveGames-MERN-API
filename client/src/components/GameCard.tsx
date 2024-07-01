import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onAddGame: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onAddGame }) => {
  return (
    <div className="game-card">
      <div className="game-details">
      <h2 className="game-title">{game.title.length > 30 ? `${game.title.slice(0, 30)}...` : game.title}</h2>
        <p className="game-info">
          <strong>Genres:</strong> {game.genres.map((genre) => genre.genre_name).join(', ')}
        </p>
        <p className="game-info">
          <strong>First Release Date:</strong> {game.platforms[0]?.first_release_date}
        </p>
        {game.sample_cover && (
          <div className="game-image">
            <img src={game.sample_cover.image} alt={`${game.title} Cover`} className="game-thumbnail" />
          </div>
        )}
      </div>
      <button className="add-button" onClick={() => onAddGame(game)}>Add</button>
    </div>
  );
};

export default GameCard;
