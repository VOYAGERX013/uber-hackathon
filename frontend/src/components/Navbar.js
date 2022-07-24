import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import axios from 'axios'
import { BsFillPersonFill } from 'react-icons/bs'

export default function Navbar() {
  const [status, setstatus] = useState(false)
  useEffect(() => {
    axios
      .post('http://localhost:8000/api/get-user/', null, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        setstatus(res.data.success)
      })
      .catch((err) => console.log(err))
  })

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        <img className="logo" src="/images/logo.png" alt="" />
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
        {status ? (
          <li className="nav-item">
            <Link to="/suggest" className="nav-links">
              Suggestions
            </Link>
          </li>
        ) : (
          <li></li>
        )}
        {status ? (
          <div className="avatarwrap">
            <BsFillPersonFill className="avatar"></BsFillPersonFill>
          </div>
        ) : (
          <div className="login">
            <Link to="/login" className="logindiv">
              Login
            </Link>
          </div>
        )}
      </ul>
    </div>
  )
}
