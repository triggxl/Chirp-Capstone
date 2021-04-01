import React from 'react';
import ChirpContext from '../../chirp-context/chirpContext';
import { Link } from 'react-router-dom';
import './landing-page.css';

const landingPage = () => {
  return (
    <ChirpContext.Consumer>
      {(context) => {
        return (
          <div id="landing-page-container">
            <div id="image-carosel">
              <section>Image-Carosel will display here</section>
              {/* image-carosels will alternate every 3-4 seconds */}
              {/* https://www.smashingmagazine.com/2012/04/pure-css3-cycling-slideshow/ */}
              <img id="image-top" src="./pictures/thom-milkovic-FTNGfpYCpGM-unsplash (1).jpg" alt="old typewriter" number="3" />
              <img id="image-top" src="./pictures/nathan-dumlao-pMW4jzELQCw-unsplash.jpg" alt="a circular table with cups containing different shades of expresso" />
            </div>
            <h1 id="site-title">Welcome to Chirp-(En-Passant)!</h1>
            <p>(An online blog/message board)</p>
            <Link to="/message-board"><button>Let's Get Started!</button></Link>
            <br />
            <img id="image-btm" src="./pictures/damon-hall-gZlycYbRtkk-unsplash.jpg" alt="vivid parrots up close in the wild" />
            <img id="image-btm" src="./pictures/pavan-trikutam-71CjSSB83Wo-unsplash.jpg" alt="three old rotary phones lined up against a wall" />
          </div>
        )
      }}
    </ChirpContext.Consumer>
  )
}

export default landingPage;
