import React, { useState, useEffect } from 'react'
import './Homepage.css'
import { BiSearchAlt } from 'react-icons/bi'
import { BsChevronDoubleDown } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FiCopy } from 'react-icons/fi'

export default function Homepage() {
  const [link, setlink] = useState('')
  const [high, sethigh] = useState(true)
  const [switchtext, setswitch] = useState('to input direct text')
  const [placehd, setplacehd] = useState('Paste your link here!')
  const [rowsforta, setrowsforta] = useState(1)

  const [summary, setsummary] = useState(
    'Highlights (Extractive Summarization)',
  )
  const [suggestlink, setsuggestlink] = useState('/')
  const [suggest, suggestedcontent] = useState([
    {
      title: 'Abstractive Text Summarization - Papers With Code',
      subtitle:
        'Abstractive Text Summarization is the task of generating a short and concise summary that captures the salient ideas of the source text.',
      link: 'https://paperswithcode.com/task/abstractive-text-summarization',
    },
    {
      title: 'Abstractive Text Summarization - Papers With Code',
      subtitle:
        'Abstractive Text Summarization is the task of generating a short and concise summary that captures the salient ideas of the source text.',
      link: 'https://paperswithcode.com/task/abstractive-text-summarization',
    },
    {
      title: 'Abstractive Text Summarization - Papers With Code',
      subtitle:
        'Abstractive Text Summarization is the task of generating a short and concise summary that captures the salient ideas of the source text.',
      link: 'https://paperswithcode.com/task/abstractive-text-summarization',
    },
  ])

  const [suggeststyle, setsuggeststyle] = useState(false)
  const openurl = (ind) => {
    window.open(suggest[ind].link, '_blank', 'noopener,noreferrer')
  }
  useState(() => {}, [suggestlink])
  return (
    <div className="wrap">
      <div className="user">
        <div className="name">IN BRIEF</div>
        <div className="desc">Sum your articles and learn with us</div>
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
            <BiSearchAlt className="iconsearch"></BiSearchAlt>
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
                setsummary('Highlights (Extractive Summarization)')
              }}
            >
              Highlights
            </div>
            <div
              className={high ? 'not_selected' : 'selected'}
              onClick={() => {
                sethigh(false)
                setsummary('Summary (Abstractive Summarization)')
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
      <div
        className="suggested"
        onClick={() => {
          setsuggeststyle(true)
        }}
      >
        View More Suggested Contents...
      </div>
      <div className={suggeststyle ? 'suggestedcontentlist' : 'close'}>
        {suggest.map((e, index) => {
          return (
            <div
              className="suggestedwrap"
              onClick={() => {
                openurl(index)
              }}
            >
              <div className="suggestedtitle">{e.title}</div>
              <div className="suggestedsub">
                {e.subtitle.substring(0, 120)}...
              </div>
            </div>
          )
        })}
        <div
          className="collapse"
          onClick={() => {
            setsuggeststyle(false)
          }}
        >
          Collapse ⏶
        </div>
      </div>
    </div>
  )
}
