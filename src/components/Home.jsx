import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => (
  <div className="home-container">
    <h1>Home</h1>
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/create" className="nav-button">Create</Link>
        </li>
        <li>
          <Link to="/read" className="nav-button">Read</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Home;
