import React, { useState, useEffect } from 'react'
import './Signin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Signin() {
  const [account, setaccount] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  const signin = () =>{
    axios.post('http://localhost:8000/api/login/', {
        email: account,
        password: password
    }, {withCredentials: true})
    .then(res => {
        console.log(res)
        navigate('/')
    })
    .catch(err => console.log(err))
  }

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
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setpassword(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="btn_signin" onClick={signin}>Sign in</div>
        <Link to="/register">
          <div className="signup">Sign up</div>
        </Link>
      </div>
    </div>
  )
}
