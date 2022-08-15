import React, { useState, useEffect } from 'react'
import '../../App.css'
import MC from '../Multiple'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useLocation } from "react-router-dom"

function MultipleChoice() {
    const location = useLocation();
    console.log("LOC")
    console.log(location.state.quest_data)
  return (
    <>
      <Navbar />
      <MC quest_data={location.state.quest_data}/>
      <Footer />
    </>
  )
}

export default MultipleChoice
