// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home-container'>
      <h1 className='home-title'>Welcome to the Game</h1>
      <p className='home-subtitle'>This is the home page.</p>
      <Link className='home-button' to="/game">Play Game</Link>
      <Link className='camera-button' to="/camera">Camera</Link>
    </div>
  );
}

export default Home;