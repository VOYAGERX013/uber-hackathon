import React, { useState, useEffect } from 'react'
import './FAQ.css'
function FAQ() {
  return (
    <div className="wrap">
      <div className="container">
        <div className="text">
          <div className="title">FAQs</div>
          <div className="description">
            Here are some FAQs to help you learn about InBrief!
          </div>
        </div>
        <div className="picture">
          <img className="img" src="/images/faq.png" alt="" />
        </div>
      </div>
      <img className="bg" id="faqbg" src="/images/bg.png" alt="" />

      <div className="faqwrap">
        <div className="question">1. What is InBrief?</div>
        <div className="answer">
          InBrief is an innovative and multi-functional website that aids the
          self-learning process through content summarization, in-depth content
          suggestion, and question generation from the original material. Hence,
          it enables people around the world to learn any subject of interest by
          suggesting and summarizing content from the web.
        </div>
        <div className="answer">
          With its frontend supported by React framework and backend coded with
          Django, the platform integrates trained extractive, abstractive
          summarization algorithms as well as a question-generating machine
          learning that allows users to review central concepts with interactive
          multiple questions and short answer responses.
        </div>
        <div className="question">2. Who are we?</div>
        <div className="answer">
          InBrief is created by 3 high school students from 2 different
          countries who share the same passion for coding and creating a website
          that helps make self-learning online more efficient and convenient. We
          hope to benefit students just like us and other online self-learners
          as well.
        </div>
        <div className="question">3. How do I generate a summary?</div>
        <div className="answer">
          By simply pasting the source that you want to summarize into the
          search bar on the home page and pressing enter, the highlights,
          summary, and automatically generated question will be shown in the box
          just below the search bar. Users can easily switch between the three
          by clicking each tab labeled. Additionally, we are currently working
          on a google extension that will automatically summarize pages and
          generate practice questions accordingly.
        </div>
        <div className="question">4. Do I have to pay for this website?</div>
        <div className="answer">
          No, all functions provided on this website are FREE for everyone!
        </div>
        <div className="question">
          5. Why should I create an InBrief account?
        </div>
        <div className="answer">
          By logging in to an account, the summaries and questions that are
          generated can be saved to your account. With an InBrief account, you
          can receive a more personalized service with customized content
          suggestions and weekly emails.
        </div>
        <div className="question">
          6. Can I download the summaries and questions I generated?
        </div>
        <div className="answer">
          Yes. Even though this function is not fully developed yet, pdf files
          of the summaries and questions will be downloadable in the future.
        </div>
        <div className="question">
          7. Can I review the questions that I got wrong after taking the quiz?
        </div>
        <div className="answer">
          Yes, you can click the question number on the completion page after
          the quiz to go back to the specific question.
        </div>
        <div className="question">
          8. Do I have to go through the quiz to get all the answers and
          questions?
        </div>
        <div className="answer">
          Yes. This ensures comprehensive practice and learning.
        </div>
        <div className="question">
          9. What should I do if I have more questions?
        </div>
        <div className="answer">
          If you have any more questions, you can contact us via email
          (InBrief.Learn@gmail.com), and we would be happy to help you!
        </div>
      </div>
    </div>
  )
}
export default FAQ
