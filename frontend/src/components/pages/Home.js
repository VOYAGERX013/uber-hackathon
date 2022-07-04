import React, { useState, useEffect } from 'react'
import '../../App.css'
import Homepage from '../Homepage'
import Navbar from '../Navbar'
import Footer from '../Footer'

function Home() {
  return (
    <>
      <Navbar />
      <Homepage />
      <Footer />
    </>
  )
}

export default Home
