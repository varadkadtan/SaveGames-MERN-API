import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onNavigate?: () => void; // Making onNavigate optional
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <div className="navbar">
      {/* Use Link component for navigation */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        
      </Link>
    </div>
  );
};

export default Navbar;
