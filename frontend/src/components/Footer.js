import React from 'react'
import { SiInstagram, SiGmail } from 'react-icons/si'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <div className="footer">
      <div class="footername">
        <Link to="/about" className="namelink">
          In Brief
        </Link>
      </div>
      <div class="footerrights">In Brief © 2022</div>
      <div class="iconswrap">
        <a class="icons" href="" target="_blank" aria-label="Instagram">
          <SiInstagram class="fab fa-instagram" />
        </a>
        <a class="icons" href="" target="_blank" aria-label="Gmail">
          <SiGmail class="fa fa-envelope" />
        </a>
      </div>
    </div>
  )
}
