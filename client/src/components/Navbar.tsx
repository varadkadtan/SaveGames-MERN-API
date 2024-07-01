// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/game-list">Home</Link>
        </li>
        <li>
          <Link to="/my-games">My Games</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
