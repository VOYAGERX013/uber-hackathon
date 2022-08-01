import React, { useState, useEffect } from 'react'
import './Homepage.css'
import { BiSearchAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { BsChevronDoubleDown } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FiCopy } from 'react-icons/fi'
import axios from 'axios'
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

export default function Homepage() {
  const [stat, setstat] = useState(false)
  const [status, setstatus] = useState(false)
  const [username, setusername] = useState('')
  const [def, setdef] = useState(false)
  const [word, setword] = useState('word')
  const [definition, setdefinition] = useState('definition')
  const closedef = () => {
    setdef(false)
  }
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .post('http://localhost:8000/api/get-user/', null, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data)
        setstatus(res.data.success)
        setusername(res.data.result.username)
      })
      .catch((err) => console.log(err))
  })

  const logout = () => {
    axios.post('http://localhost:8000/api/logout/', null, {
      withCredentials: true,
    })
    navigate('/login')
  }

  useEffect(() => {
    setdef(true)
  }, [status])

  const [link, setlink] = useState('')
  const [high, sethigh] = useState(true)
  const [switchtext, setswitch] = useState('to input direct text')
  const [placehd, setplacehd] = useState('Paste your link here!')
  const [rowsforta, setrowsforta] = useState(1)

  const [summary, setsummary] = useState(
    'Highlights (Extractive Summarization)',
  )

  const [abstractive, setAbstractive] = useState("")
  const [extractive, setExtractive] = useState("")

  const handleLink = () => {
    axios
      .post(
        'http://localhost:8000/api/summarize/link/',
        {
          link: link,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setsummary(`${res.data.summary.substr(0, 2000)}...`)
        setExtractive(`${res.data.summary.substr(0, 2000)}...`)
        window.scroll({
            top: 1000,
            left: 0, 
            behavior: 'smooth',
        });

        // axios.post("http://localhost:8000/api/summarize/abstractive-link/", {
        //     link: link
        // }, {
        //     withCredentials: true
        // })
        // .then(res => {
        //     setAbstractive(res.data.summary)
        // })
      })
  }

  return (
    <div className="wrap">
      <div id="dialogcontainer">
        <BootstrapDialog
          className="dialog"
          id="correctdialog"
          aria-labelledby="customized-dialog-title"
          open={def}
          onClose={closedef}
        >
          <div className="dialogtext" id="deftitle">
            WORD of the day
          </div>
          <b className="dialogtext" id="defword">
            {word}
          </b>
          <div className="dialogtext" id="defdef">
            {definition}
          </div>
        </BootstrapDialog>
      </div>
      <div className="user">
        <div className="userheader">
          {status ? (
            <div>
              <div onClick={logout}>LOGOUT</div>
              <div className="name" id="welcometitle">
                Hello, {username}
              </div>

              <div className="desclogged">Learn with ease, choose InBrief</div>
            </div>
          ) : (
            <div>
              <div className="name">IN BRIEF</div>
              <div className="desc">Learn with ease, choose InBrief</div>
              <div className="records">
                <div className="recordswrap">
                  <div className="number">60+</div>
                  <div className="recordsdescription">
                    Videos<br></br>Processed
                  </div>
                </div>
                <div className="recordswrap">
                  <div className="number">60+</div>
                  <div className="recordsdescription">
                    Videos<br></br>Processed
                  </div>
                </div>
                <div className="recordswrap">
                  <div className="number">60+</div>
                  <div className="recordsdescription">
                    Videos<br></br>Processed
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="inputoutwrap">
          <div className="inputlinkwrap">
            <textarea
              className="inputlink"
              rows={rowsforta}
              type="text"
              placeholder={placehd}
              value={link}
              onChange={(e) => {
                setlink(e.target.value)
              }}
            />
          </div>
          <div className="iconwrap">
            <BiSearchAlt
              className="iconsearch"
              onClick={handleLink}
            ></BiSearchAlt>
          </div>
        </div>

        <div className="change">
          <div>...Or </div>
          <b
            className="specific"
            onClick={() => {
              if (switchtext == 'to input direct text') {
                setswitch('to input link')
                setplacehd('Paste the text here!')
                setrowsforta(20)
              } else {
                setswitch('to input direct text')
                setplacehd('Paste your link here!')
                setrowsforta(1)
              }
            }}
          >
            CLICK ME{' '}
          </b>
          <div>{switchtext}</div>
        </div>
        <BsChevronDoubleDown className="icondown"></BsChevronDoubleDown>
      </div>
      <div className="summary">
        <div className="selectbar">
          <div className="left">
            <div
              className={high ? 'selected' : 'not_selected'}
              onClick={() => {
                sethigh(true)
                {link != "" && setsummary(extractive)}
                // setsummary('Highlights (Extractive Summarization)')
              }}
            >
              Highlights
            </div>
            <div
              className={high ? 'not_selected' : 'selected'}
              onClick={() => {
                sethigh(false)
                {
                  link != '' && setsummary(abstractive)
                }
                // setsummary('Summary (Abstractive Summarization)')
              }}
            >
              Summary
            </div>
          </div>
          <div className="right">
            <Link className="link" to="/mc">
              <div className="practicebtn">Go To Practice Questions</div>
            </Link>
          </div>
        </div>
        <div className="summarytext">
          <div className="copywrap">
            <FiCopy
              className="iconcopy"
              onClick={() => {
                navigator.clipboard.writeText(summary)
              }}
            ></FiCopy>
          </div>
          <div>{summary}</div>
        </div>
      </div>
      {/* <div
        className="suggested"
        onClick={() => {
          setsuggeststyle(true)
        }}
      >
        View More Suggested Contents...
      </div>
       */}
    </div>
  )
}
