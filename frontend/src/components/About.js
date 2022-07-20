import React, { useState, useEffect } from 'react'

import './About.css'
function About() {
  return (
    <div className="wrap">
      <div className="container">
        <div className="text">
          <div className="title">InBrief</div>
          <div className="description">
            An innovative, multi-functional website that aids the self-learning
            process through summarization, in-depth content suggestion, and
            question generation.
          </div>
        </div>
        <div className="picture">
          <img className="img" src="/images/AboutUs.png" alt="" />
        </div>
      </div>
      <div>
        <img className="bg" src="/images/bg.png" alt="" />
        <div className="wraptext">
          <div className="head">About Us</div>
          <div className="content">
            InBrief is created by 3 high school students from 2 different
            countries who share the same passion for coding and creating a
            website that helps make self-learning online more efficient and
            convenient. Our motive for creating InBrief was simple. We wanted to
            use the free resources on the web to provide a new, interactive and
            efficient method of learning any subject of interest. And by using
            content suggestion, summarization, and question generation, we hope
            to provide people around the world with a new way to learn any
            subject they would like to. We hope to benefit students just like us
            and other online self-learners as well.
          </div>
        </div>
        <div className="threePics">
          <div className="pic">
            <img className="img3" src="/images/img1.png" alt="" />
            <div className="content2">Summarization</div>
          </div>
          <div className="pic">
            <img className="img3" src="/images/img2.png" alt="" />
            <div className="content2">Questions</div>
          </div>
          <div className="pic">
            <img className="img3" src="/images/img3.png" alt="" />
            <div className="content2">Suggestions</div>
          </div>
        </div>

        <div className="wraptext">
          <div className="head">Who are we?</div>
          <div className="selfIntro">
            <div className="introPic1">
              <img className="profile" src="/images/img1.png" alt="" />
              <div className="intro">
                Hi, I’m Elena Kao, currently a rising senior studying at Taipei
                Fuhsing Private School. I enjoy using efficient codes to try to
                solve complex problems in my daily life and in the community
                around me. In my leisure time, I also like to play video games
                and travel around places to experience something new.
              </div>
            </div>
            <div className="introPic1">
              <img className="profile" src="/images/img2.png" alt="" />
              <div className="intro">
                Here is your self introduction. Write some sentences here.
                Basically just a paragraph introducing yourself. idk im just
                filling up spaces soooooo just make it good. This should be
                about 4 lines so I’m gonna make it four lines so the layout is
                good. Also be sure to send me a your picture so I can place it
                on the left side.
              </div>
            </div>
            <div className="introPic1">
              <img className="profile" src="/images/img3.png" alt="" />
              <div className="intro">
                Here is your self introduction. Write some sentences here.
                Basically just a paragraph introducing yourself. idk im just
                filling up spaces soooooo just make it good. This should be
                about 4 lines so I’m gonna make it four lines so the layout is
                good. Also be sure to send me a your picture so I can place it
                on the left side.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
