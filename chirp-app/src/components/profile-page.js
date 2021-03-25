import React from 'react';
import ChirpContext from '../chirp-context/chirpContext';
import { Link } from 'react-router-dom';

const profilePage = () => {

  return (
    <ChirpContext.Consumer>
      {(context) => {
        return (
          <div id="profile-container">
            <h1 id="profile-title">My Profile</h1>
            <div>
              <img src="search-bar-icon" alt="search bar icon to search through messages" />
              <select name="drop-down-for-mb" id="drop-down-for-mb">
                {/* <!-- links route to corresponding pages; hamburger for 'options' below --> */}
                <option value="my-posts">Show All Posts</option>
                <option value="back-to-mb">
                  <Link to="/message-board">
                    Message Board
                  </Link></option>
                <option value="sign-out">More Options Coming Soon..!</option>
              </select>
              {/* <!-- edit/add new photo 'pencil' btn upon click--> */}
              <img src="profile-avatar-user" alt="rounded potrait centered on screen" />
              <section>
                <ul>Test-User</ul>
                {/* <!-- expand on click --> */}
                <ul>Recent Posts</ul>
                <ul>Current Date/Time</ul>
              </section>
            </div>
          </div>
        )
      }}
    </ChirpContext.Consumer>
  )
}

export default profilePage
