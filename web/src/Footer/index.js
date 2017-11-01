import React from 'react';
import { Link } from 'react-router-dom'

// lightweight component declaration style
const Footer = () => (
  <section className="section">
    <footer>
      <div className="content">
        <h1>pages:</h1>
        <ul>
          <li><Link to="/">home page</Link></li>
          <li><Link to="/profile">profile page (protected)</Link></li>
          <li><Link to="/api-demo">API demo (protected and unprotected)</Link></li>
        </ul>
      </div>
    </footer>
  </section>
);

export default Footer;
