import React, { useState, useEffect } from 'react'
import './Multiple.css'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import PropTypes from 'prop-types'
import DialogTitle from '@mui/material/DialogTitle'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
}

function Multiple() {
  // Properties
  const [showResults, setShowResults] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [correct, setcorrect] = useState(false)
  const [wrong, setwrong] = useState(false)
  const [warn, setwarn] = useState(false)
  const [nexttext, setnexttext] = useState('Next Question')
  const closewarn = () => {
    setwarn(false)
  }
  const [back, setback] = useState(false)
  const [questioncount, setquestioncount] = useState([
    'focused',
    'unreached',
    'unreached',
    'unreached',
    'unreached',
  ])
  const [choice, setchoice] = useState([
    'choices',
    'choices',
    'choices',
    'choices',
  ])
  const [selected, setselectedchoice] = useState(-1)
  const questions = [
    {
      text: 'What is the capital of America?',
      options: [
        { id: 0, text: 'New York City', isCorrect: false },
        { id: 1, text: 'Boston', isCorrect: false },
        { id: 2, text: 'Santa Fe', isCorrect: false },
        { id: 3, text: 'Washington DC', isCorrect: true },
      ],
    },
    {
      text: 'What year was the Constitution of America written?',
      options: [
        { id: 0, text: '1787', isCorrect: true },
        { id: 1, text: '1776', isCorrect: false },
        { id: 2, text: '1774', isCorrect: false },
        { id: 3, text: '1826', isCorrect: false },
      ],
    },
    {
      text: 'Who was the second president of the US?',
      options: [
        { id: 0, text: 'John Adams', isCorrect: true },
        { id: 1, text: 'Paul Revere', isCorrect: false },
        { id: 2, text: 'Thomas Jefferson', isCorrect: false },
        { id: 3, text: 'Benjamin Franklin', isCorrect: false },
      ],
    },
    {
      text: 'What is the largest state in the US?',
      options: [
        { id: 0, text: 'California', isCorrect: false },
        { id: 1, text: 'Alaska', isCorrect: true },
        { id: 2, text: 'Texas', isCorrect: false },
        { id: 3, text: 'Montana', isCorrect: false },
      ],
    },
    {
      text: 'Which of the following countries DO NOT border the US?',
      options: [
        { id: 0, text: 'Canada', isCorrect: false },
        { id: 1, text: 'Russia', isCorrect: true },
        { id: 2, text: 'Cuba', isCorrect: true },
        { id: 3, text: 'Mexico', isCorrect: false },
      ],
    },
  ]

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = () => {
    if (selected == -1) {
      setwarn(true)
    } else {
      let flag = questions[currentQuestion].options[selected].isCorrect
      setselcted(-1)
      // Increment the score
      if (flag) {
        setScore(score + 1)
        setchoice(['choices', 'choices', 'choices', 'choices'])
        let array = questioncount
        array[currentQuestion] = 'correct'
        if (currentQuestion + 1 < questions.length) {
          array[currentQuestion + 1] = 'focused'
        }
        setquestioncount(array)
        setcorrect(true)
      } else {
        setwrong(true)
        let array = questioncount
        array[currentQuestion] = 'wrong'
        if (currentQuestion + 1 < questions.length) {
          array[currentQuestion + 1] = 'focused'
        }
        setquestioncount(array)
        setchoice(['choices', 'choices', 'choices', 'choices'])
      }
    }
  }
  useEffect(() => {
    if (currentQuestion + 1 < questions.length) {
      console.log(currentQuestion)
      setnexttext('Next Question')
      console.log('changed as next q')
    } else {
      setnexttext('View Results')
      console.log('changed as view')
    }
  }, [selected])
  const next = () => {
    setCurrentQuestion(currentQuestion + 1)
    setwrong(false)
    setcorrect(false)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }
  const goback = () => {
    setCurrentQuestion(currentQuestion - 1)
  }
  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0)
    setCurrentQuestion(0)
    setShowResults(false)
    setquestioncount([
      'focused',
      'unreached',
      'unreached',
      'unreached',
      'unreached',
    ])
  }
  const setselcted = (ind) => {
    let arr = ['choices', 'choices', 'choices', 'choices']
    arr[ind] = 'choices_selected'
    setchoice(arr)
    setselectedchoice(ind)
  }
  return (
    <div className="mcwrap">
      <div id="dialogcontainer">
        <BootstrapDialog
          className="dialog"
          id="correctdialog"
          aria-labelledby="customized-dialog-title"
          open={correct}
        >
          <div className="dialogtext" id="correcttext">
            Correct
          </div>
          <div className="nextwrap">
            <div className="dialogtext" id="next" onClick={next}>
              {nexttext}
            </div>
          </div>
          {/* <div className="dialogtext" id="explanation">
            See Explanation
          </div> */}
        </BootstrapDialog>
      </div>
      <div id="dialogcontainer">
        <BootstrapDialog
          className="dialog"
          id="wrongdialog"
          aria-labelledby="customized-dialog-title"
          open={wrong}
        >
          <div className="dialogtext" id="wrongtext">
            Incorrect
          </div>
          <div className="nextwrapwrong">
            <div className="dialogtext" id="nextwrong" onClick={next}>
              {nexttext}
            </div>
          </div>

          {/* <div className="dialogtext" id="explanation">
            See Explanation
          </div> */}
        </BootstrapDialog>
      </div>
      <div id="dialogcontainer">
        <BootstrapDialog
          className="dialog"
          id="correctdialog"
          aria-labelledby="customized-dialog-title"
          open={warn}
          onClose={closewarn}
        >
          <div className="dialogtext" id="warning">
            Please select an answer
          </div>
        </BootstrapDialog>
      </div>
      <Link className="link" to="/">
        <div className="back">
          <div className="backicon">🞀</div>
          <div className="toMain"> Back to Main Page</div>
        </div>
      </Link>
      {/* 1. Header  */}

      {/* 2. Current Score  */}

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="finalresults">
          <div className="finaltextwrap">
            <div className="finaltext">YOU HAVE COMPLETED</div>
            <div className="finaltextinner">
              <div className="finaltext" id="numbercorrect">
                {questions.length}{' '}
              </div>
              <div className="finaltext">QUESTIONS!</div>
            </div>
          </div>
          <div className="correctrate">
            Correct Rate：{(score / questions.length) * 100}%
          </div>
          <div className="questioncounts_final">
            {questioncount.map((e, ind) => {
              return (
                <div className="count" id={e}>
                  {ind + 1}
                </div>
              )
            })}
          </div>
          <br></br>
          <button className="restartbutton" onClick={() => restartGame()}>
            Restart practice
          </button>
        </div>
      ) : (
        <div className="questioncard">
          <div className="questioncounts">
            {questioncount.map((e, ind) => {
              return (
                <div className="count" id={e}>
                  {ind + 1}
                </div>
              )
            })}
          </div>
          <div className="questiontext">{questions[currentQuestion].text}</div>

          <div className="choicewrap">
            {questions[currentQuestion].options.map((option, ind) => {
              return (
                <div
                  className={choice[ind]}
                  key={option.id}
                  onClick={() => setselcted(ind)}
                >
                  {option.text}
                </div>
              )
            })}
          </div>
          <div className="buttons">
            <div
              className={back ? 'button' : 'disappear'}
              id="backbtn"
              onClick={goback}
            >
              Back
            </div>
            <div
              className="button"
              id="check"
              onClick={() => {
                optionClicked()
              }}
            >
              Check Answer
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Multiple
