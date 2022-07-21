import React, { useState, useEffect } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
export default function Signup() {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpass, setconfirmpass] = useState('')
  const [email, setemail] = useState('')

  return (
    <div className="registerwrap">
      <div className="regbox">
        <div className="registersub">Register an account!</div>
        <div className="inputwrap">
          <div className="account">
            <input
              className="input"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => {
                setusername(e.target.value)
              }}
            />
          </div>
          <div className="account">
            <input
              className="input"
              value={password}
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setpassword(e.target.value)
              }}
            />
          </div>
          <div className="account">
            <input
              className="input"
              type="password"
              value={confirmpass}
              placeholder="Re-enter your password"
              onChange={(e) => {
                setconfirmpass(e.target.value)
              }}
            />
          </div>
          <div className="account">
            <input
              className="input"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => {
                setemail(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="regwrap">
          <div className="regbtn">Register</div>
        </div>
        <div className="wordwrap">
          <Link to="/login">
            <b className="loginword">Log in</b>
          </Link>
          <div> if you already have an account!</div>
        </div>
      </div>
    </div>
  )
}
