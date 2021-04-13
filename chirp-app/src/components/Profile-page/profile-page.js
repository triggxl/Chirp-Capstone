import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import { Link } from 'react-router-dom';
import './profile-page.css';


const profilePage = () => {

  return (
    <chirpContext.Consumer>
      {(context) => {
        return (
          <div id="profile-container">
            <h1 id="profile-title">My Profile: [Coming Soon..!]</h1>
            <Link to="/message-board">Back to Message Board</Link>
            {/* <div>
              <img src="search-bar-icon" alt="search bar icon to search through messages" />
              <!-- links route to corresponding pages; hamburger for 'options' below -->
              <div id="profile-links">
                <Link to="/">Home</Link>
                <Link to="/message-board">Message Board</Link>
                <Link to="/my-posts">Show All Posts</Link>
              </div>
              <Link to="sign-out">More Options Coming Soon..!</Link>
              <!-- edit/add new photo 'pencil' btn upon click-->
              <i className="far fa-user-circle"></i>
              <section>
                <ul>Test-User</ul>
                <!-- expand on click; ref using this.state.testUser.date?-->
                <ul>Recent Posts</ul>
                <ul>Current Date/Time</ul>
              </section>
            </div> */}
          </div>
        )
      }}
    </chirpContext.Consumer>
  )
}

export default profilePage;
