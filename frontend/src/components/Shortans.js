import React, { useState, useEffect } from 'react'
import './Shortans.css'
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

function Shortans() {
  // Properties
  const [showResults, setShowResults] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [correct, setcorrect] = useState(false)
  const [wrong, setwrong] = useState(false)
  const [warn, setwarn] = useState(false)
  const [style, setstyle] = useState(false)
  const [nexttext, setnexttext] = useState('Next Question')
  const closewarn = () => {
    setwarn(false)
  }
  const [ans, setans] = useState('')
  const [back, setback] = useState(false)
  const [questioncount, setquestioncount] = useState([
    'focused',
    'unreached',
    'unreached',
    'unreached',
    'unreached',
  ])
  const [selected, setselectedchoice] = useState(-1)
  const questions = [
    {
      text: 'What is the capital of America?',
      correctchoice: 'Washington DC',
      explanation: 'explanations......',
    },
    {
      text: 'What year was the Constitution of America written?',
      correctchoice: '1787',
      explanation: 'explanations......',
    },
    {
      text: 'Who was the second president of the US?',

      correctchoice: 'John Adams',
      explanation: 'explanations......',
    },
    {
      text: 'What is the largest state in the US?',
      correctchoice: 'Alaska',
      explanation: 'explanations......',
    },
    {
      text: 'Which of the following countries DO NOT border the US?',
      correctchoice: 'Russia',
      explanation: 'explanations......',
    },
  ]

  // Helper Functions
  /* A possible answer was clicked */
  const optionClicked = () => {
    if (ans == '') {
      setwarn(true)
    } else {
      let correct = questions[currentQuestion].correctchoice.toLowerCase()
      console.log(correct)
      // Increment the score
      if (correct == ans) {
        setScore(score + 1)
        let array = questioncount
        array[currentQuestion] = 'correct'
        if (currentQuestion + 1 < questions.length) {
          array[currentQuestion + 1] = 'focused'
        }
        setquestioncount(array)
        setcorrect(true)
        setans('')
      } else {
        setwrong(true)
        let array = questioncount
        array[currentQuestion] = 'wrong'
        if (currentQuestion + 1 < questions.length) {
          array[currentQuestion + 1] = 'focused'
        }
        setquestioncount(array)
        setans('')
      }
    }
  }
  useEffect(() => {
    if (currentQuestion + 1 < questions.length) {
      console.log(currentQuestion)
      setnexttext('Next Question')
    } else {
      setnexttext('View Results')
    }
  }, [currentQuestion])
  const next = () => {
    setstyle(false)
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
          <div
            className="showanswer"
            id="correctshow"
            onClick={() => {
              setstyle(!style)
            }}
          >
            View Answer and Explanations
          </div>
          <div className="answerwrap" id="correctanswerwrap">
            <div className={style ? 'correctanswer' : 'close'}>
              Correct answer: <b>{questions[currentQuestion].correctchoice}</b>
              <br></br>
              {questions[currentQuestion].explanation}
            </div>
          </div>
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
          <div
            className="showanswer"
            onClick={() => {
              setstyle(!style)
            }}
          >
            View Answer and Explanations
          </div>
          <div className="answerwrap">
            <div className={style ? 'answerss' : 'close'}>
              Correct answer: <b>{questions[currentQuestion].correctchoice}</b>
              <br></br>
              {questions[currentQuestion].explanation}
            </div>
          </div>
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
          <div
            className="viewans"
            onClick={() => {
              setstyle(!style)
            }}
          >
            View Answers and Explanations
          </div>
          <div className={style ? 'expand' : 'close'}>
            {questions.map((e, ind) => {
              return (
                <div className="expandall">
                  <div className="questionexpand">
                    {ind + 1}. {e.text}
                  </div>
                  <b className="answerexpand">Answer: {e.correctchoice}</b>
                  <div className="explanationexpand">
                    Explanations: {e.explanation}
                  </div>
                </div>
              )
            })}
          </div>
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
            <input
              className="input_ans"
              value={ans}
              placeholder="Enter the answer..."
              onChange={(e) => {
                setans(e.target.value)
              }}
            />
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
                setstyle(false)
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

export default Shortans
