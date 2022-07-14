import { faListNumeric } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import './Interest.css'
export default function Interest() {
  const [final, setfinal] = useState([])
  const [topic, settopic] = useState({
    Animals: false,
    Astronomy: false,
    Biology: false,
    Business: false,
    Communication: false,
    Concepts: false,
    Culture: false,
    Currency: false,
    Economy: false,
    Education: false,
    Energy: false,
    Engineering: false,
    Entertainment: false,
    Ethics: false,
    Food: false,
    Geography: false,
    Government: false,
    Health: false,
    History: false,
    Humanities: false,
    Information: false,
    Internet: false,
    Literature: false,
    Linguistics: false,
    Law: false,
    Life: false,
    News: false,
    Mathematics: false,
    Military: false,
    Nature: false,
    Philosophy: false,
    Politics: false,
    Religion: false,
    Science: false,
    Sports: false,
    Technology: false,
  })

  const list = [
    'Animals',
    'Astronomy',
    'Biology',
    'Business',
    'Communication',
    'Concepts',
    'Culture',
    'Currency',
    'Economy',
    'Education',
    'Energy',
    'Engineering',
    'Entertainment',
    'Ethics',
    'Food',
    'Geography',
    'Government',
    'Health',
    'History',
    'Humanities',
    'Information',
    'Internet',
    'Literature',
    'Linguistics',
    'Law',
    'Life',
    'News',
    'Mathematics',
    'Military',
    'Nature',
    'Philosophy',
    'Politics',
    'Religion',
    'Science',
    'Sports',
    'Technology',
  ]

  const {
    Animals,
    Astronomy,
    Biology,
    Business,
    Communication,
    Concepts,
    Culture,
    Currency,
    Economy,
    Education,
    Energy,
    Engineering,
    Entertainment,
    Ethics,
    Food,
    Geography,
    Government,
    Health,
    History,
    Humanities,
    Information,
    Internet,
    Literature,
    Linguistics,
    Law,
    Life,
    News,
    Mathematics,
    Military,
    Nature,
    Philosophy,
    Politics,
    Religion,
    Science,
    Sports,
    Technology,
  } = topic

  useEffect(() => {
    let array = []
    for (let i = 0; i < list.length; i++) {
      if (topic[list[i]] == true) {
        array[array.length] = list[i]
      }
    }

    setfinal(array)
  }, [topic])
  return (
    <div className="wrap">
      <div className="interest_title">
        Choose the <b>topics</b> that interest you!
      </div>
      <div className="interest_sub">
        Please choose more than <b>three</b> interested topics to enjoy
        personalized suggestions!
      </div>
      <div className="interest_wrap">
        {list.map((e) => {
          return (
            <div
              className={topic[e].toString()}
              onClick={() => {
                settopic({
                  ...topic,
                  [e]: !topic[e],
                })
              }}
            >
              {e}
            </div>
          )
        })}
      </div>
      <div
        className="done_btn"
        onClick={() => {
          console.log(final)
        }}
      >
        Done
      </div>
      <div className="skip_btn">Skip</div>
    </div>
  )
}
