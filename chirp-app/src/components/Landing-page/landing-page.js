import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import { Link } from 'react-router-dom';
import './landing-page.css';
import Pictures from '../Pictures'

/*
images:
images need to appear
images need to fit within container
change className to match App.css selectors
 */

const landingPage = () => {
  // create array of image
  return (
    <chirpContext.Consumer>
      {(context) => {
        return (
          <div id="landing-page-container">
            <div class="container">
              <div id="content-slider">
                <div id="slider">
                  <div id="mask">
                    <ul>
                      <img className="image-top" src={Pictures.ChirpingBird} alt="Old typewriter" />
                      <img className="image-top" src={Pictures.CoffeeExpresso} alt="Circular table with cups containing different shades of expresso" />
                    </ul>
                  </div>
                  <div class="progress-bar"></div>
                </div>
              </div>
            </div>
            <h1 id="site-title">Welcome to Chirp-(En-Passant)!</h1>
            <p>(An online discussion board)</p>
            <Link to="/message-board"><button>Let's Get Started!</button></Link>
            <br />
            <div id="content-slider">
              <div id="slider">
                <div id="mask">
                  <ul>
                    <img className="image-btm" src={Pictures.ColorfulParrots} alt="vivid parrots up close in the wild" />
                    <img className="image-btm" src={Pictures.OldTelephone} alt="three old rotary phones lined up against a wall" />                    </ul>
                </div>
                <div class="progress-bar"></div>
              </div>
            </div>

          </div>
        )
      }}
    </chirpContext.Consumer>
  )
}

export default landingPage;