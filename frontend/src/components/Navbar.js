import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        Logo
      </Link>
      <ul className="nav-m">
        <li className="nav-item">
          <Link to="/" className="nav-links">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/aboutus" className="nav-links">
            About Us
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/faq" className="nav-links">
            FAQ
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/extension" className="nav-links">
            Extension
          </Link>
        </li>
        <div className="login">
          <Link to="/login" className="logindiv">
            Login
          </Link>
        </div>
      </ul>
    </div>
  )
}
