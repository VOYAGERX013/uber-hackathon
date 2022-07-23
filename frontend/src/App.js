import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './components/fonts.css'
import Home from './components/pages/Home'
import MC from './components/pages/MultipleChoice'
import Login from './components/pages/Login'
import Interests from './components/pages/Interests'
import SA from './components/pages/Shortanswer'
import Register from './components/pages/Register'
import About from './components/pages/Aboutus'
import FAQ from './components/pages/FAQs'
import 'font-awesome/css/font-awesome.min.css'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/aboutus" element={<About />}></Route>
          <Route exact path="/faq" element={<FAQ />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/interest" element={<Interests />}></Route>
          <Route exact path="/mc" element={<MC />}></Route>
          <Route exact path="/sa" element={<SA />}></Route>
        </Routes>

        {/* <Footer></Footer> */}
      </Router>
    </div>
  )
}

export default App
