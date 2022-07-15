import React, { useState, useEffect } from 'react'
import './Signin.css'
import { Link } from 'react-router-dom'
export default function Signin() {
  const [account, setaccount] = useState('')
  const [password, setpassword] = useState('')

  return (
    <div className="signinwrap">
      <div className="signinbox">
        <div className="signintitle">Welcome Back {':)'}</div>
        <div className="inputwrap">
          <div className="account">
            <input
              className="input"
              value={account}
              placeholder="Enter your account"
              onChange={(e) => {
                setaccount(e.target.value)
              }}
            />
          </div>
          <div className="account">
            <input
              className="input"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => {
                setpassword(e.target.value)
              }}
            />
          </div>
        </div>
        <Link to="/register">
          <div className="signup">Sign up</div>
        </Link>
      </div>
    </div>
  )
}
