import React, { useState, useEffect } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

// http://localhost:8000/api/suggestion/suggest-interests/ POST request Output in the form of {"success", "suggestions"}

export default function Signup() {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpass, setconfirmpass] = useState('')
  const [email, setemail] = useState('')
  const [interest, setinterest] = useState(false)
  const [keywords, setkeyword] = useState("")
  const [suggest, setsuggestions] = useState(["Loading..."])
  const navigate = useNavigate()
  const register = (int) => {
        console.log(email)
        console.log(password)
        console.log(username)
        console.log(int)
        axios.post('http://localhost:8000/api/register/', {
            email: email,
            password: password,
            username: username,
            interest: int
        })
        .then(res => {
            console.log(res)
            axios.post("http://localhost:8000/api/append-to-db/", {
                email: email
            })
            navigate('/login')
        })
        .catch(err => console.log(err))
      
  }

  useEffect(()=>{
    axios.post('http://localhost:8000/api/suggestion/suggest-interests/', {
       query: keywords
    })
    .then(res => {
        console.log(res)
        if(res.data.success){
          setsuggestions(res.data.suggestions)
        }
    })
    .catch(err => console.log(err))

  }, [keywords])
  

  return (
    <div className="registerwrap">
      <div className="regbox">
        {interest ? (
          <div>
          <div className = "backreg"
          onClick = {()=>{
            setinterest(false)
          }}>{"<"} Back</div>
            <div className="registersub">Choose your interests!</div>
            <div className="inputsearchwrap">
            <input
              className="inputsearch"
              type="text"
              placeholder="Search your topics of interest!"
              value={keywords}
              onChange={(e) => {
                setkeyword(e.target.value)
              }}
            />
          </div>
          <div className = "gridding">
            {suggest.map((e)=>{
              return(
                <div className="gridinnerwrap" onClick={()=>{
                  register(e)
                  // navigate("/login")
                }}>{e}</div>
              )
            })}
          </div>
          </div>
        ):(
          <div>
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
          
          <div className="regbtn" onClick={()=>{
              
    if(password != confirmpass){
      console.log("Passwords do not match!!")
    }else{
              setinterest(true)
          }}}>Next</div>
       
        </div>
        </div>)}
        
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
