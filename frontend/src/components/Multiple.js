import React, { useState, useEffect } from 'react'
import './Multiple.css'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
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
  const [style, setstyle] = useState(false)

  const navigate = useNavigate()
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
      text: 'When did the earliest economists live?',
      options: [
        { id: 0, text: '10th-century B.C.', isCorrect: false },
        { id: 1, text: '8th-century B.C.', isCorrect: true },
        { id: 2, text: '9th-century B.C.', isCorrect: false },
        { id: 3, text: '7th-century B.C.', isCorrect: false },
      ],
      correctchoice: ['B', 3],
      explanation: 'explanations......',
    },
    {
      text: 'Till when did Feudalism exist?',
      options: [
        { id: 0, text: '15th century', isCorrect: true },
        { id: 1, text: '18th century', isCorrect: false },
        { id: 2, text: '6th century', isCorrect: false },
        { id: 3, text: '10th century', isCorrect: false },
      ],
      correctchoice: ['A', 0],
      explanation: 'explanations......',
    },
    {
      text: 'Who won Nobel Prizes in economics?',
      options: [
        { id: 0, text: 'Scientists', isCorrect: false },
        { id: 1, text: 'Politicians', isCorrect: false },
        { id: 2, text: 'Sportsmen', isCorrect: false },
        { id: 3, text: 'Economists', isCorrect: true },
      ],
      correctchoice: ['D', 0],
      explanation: 'explanations......',
    },
    {
      text: 'What does behavioral economics combine?',
      options: [
        { id: 0, text: 'Philosophy', isCorrect: false },
        { id: 1, text: 'Programming', isCorrect: false },
        { id: 2, text: 'Psychology', isCorrect: true },
        { id: 3, text: 'Biology', isCorrect: false },
      ],
      correctchoice: ['C', 1],
      explanation: 'explanations......',
    },
    {
      text: 'Production is determined by what in a command economy?',
      options: [
        { id: 0, text: 'Agency', isCorrect: false },
        { id: 1, text: 'Government', isCorrect: true },
        { id: 2, text: 'Private Organization', isCorrect: false },
        { id: 3, text: 'Business', isCorrect: false },
      ],
      correctchoice: ['B', 2],
      explanation: 'explanations......',
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
    } else {
      setnexttext('View Results')
    }
  }, [selected])
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
              Correct answer:{' '}
              <b>
                {'('}
                {questions[currentQuestion].correctchoice[0]}
                {')'}{' '}
                {
                  questions[currentQuestion].options[
                    questions[currentQuestion].correctchoice[1]
                  ].text
                }
              </b>
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
              Correct answer:{' '}
              <b>
                {'('}
                {questions[currentQuestion].correctchoice[0]}
                {')'}{' '}
                {
                  questions[currentQuestion].options[
                    questions[currentQuestion].correctchoice[1]
                  ].text
                }
              </b>
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
          <button
            className="restartbutton"
            onClick={() => {
              navigate('/sa')
            }}
          >
            Go to short answer practice
          </button>
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
                  <b className="answerexpand">
                    Answer: {'('}
                    {e.correctchoice[0]}
                    {') '}
                    {e.options[1].text}
                  </b>
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

export default Multiple
