import React from 'react';
import ChirpContext from '../chirp-context/chirpContext';
import { Link } from 'react-router-dom';

const landingPage = () => {
  return (
    <ChirpContext.Consumer>
      {(context) => {
        return (
          <div id="landing-page-container">
            <div id="image-carosel">
              <section>Image-Carosel will display here</section>
              {/* <!-- <img id="image-one" src="./pictures/thom-milkovic-FTNGfpYCpGM-unsplash (1).jpg" alt="this is a picture of an old typewriter" number="3"> -->
                <!-- <img src="./pictures/damon-hall-gZlycYbRtkk-unsplash.jpg" alt="vivid picture of a pair of parrots up close in the wild"> -->
                <!-- <img src="./pictures/pavan-trikutam-71CjSSB83Wo-unsplash.jpg" alt="this is a picture of three old rotary phones lined up against a wall"> -->
                <!-- <img src="./pictures/nathan-dumlao-pMW4jzELQCw-unsplash.jpg" alt="the is a picture of a circular table with cups containing different shades of expresso"> --> */}
            </div>
            <h1 id="site-title">Welcome to Chirp-(En-Passant)!</h1>
            <button id="link-to-mb-btn">
              <Link to="/message-board">
                Let's Get Started!
              </Link></button>
          </div>
        )
      }}
    </ChirpContext.Consumer>
  )
}

export default landingPage
