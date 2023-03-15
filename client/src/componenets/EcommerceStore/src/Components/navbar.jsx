import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, GameController } from 'phosphor-react';
import './navbar.css';

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <GameController size={32} />
      </div>
      <div className='links'>
        <Link to='/'>Shop</Link>
        <Link to='/cart'>
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
