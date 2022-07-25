import React, { useState, useEffect } from 'react'
import './suggestion.css'
import axios from "axios"
export default function Suggestion() {

    const [suggest, setsuggestedcontent] = useState()

    useEffect(()=>{
        axios.post('http://localhost:8000/api/suggestion/fetch-suggestions/', null, { withCredentials: true })
            .then(res => {
                let server_data = res.data.suggestions
                setsuggestedcontent(server_data)
            })
            .catch(err => console.log(err))
    })
    
      const openurl = (ind) => {
        window.open(suggest[ind].link, '_blank', 'noopener,noreferrer')
      }
  return (
    <div className = "wrap">
        <div className = "name" id="suggestionname">
            Article Suggestions
        </div>
        <div className = "desc" id = "suggestiondesc">
            Here are some suggested articles personalized for you!
        </div>
        <div className='suggestedcontentlist'>
        {suggest.map((e, index) => {
          return (
            <div
              className="suggestedwrap"
              onClick={() => {
                openurl(index)
              }}
            >
                <div>
                    <img className = "suggestedimg"></img>
                </div>
                <div className = "suggestedinnerwrap">
              <div className="suggestedtitle">{e.title}</div>
              <div className="suggestedsub">
                {e.subtitle.substring(0, 120)}...
              </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
