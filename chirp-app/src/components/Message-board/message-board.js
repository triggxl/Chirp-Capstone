import React from 'react';
import ChirpContext from '../../chirp-context/chirpContext';
import { Link, useHistory } from 'react-router-dom';
import './../../App.css';
import Post from './Post';

// import './message-board.css'


class messageBoard extends React.Component {
  render() {
    // (useHistory hook for MVP) state = {
    //   selected: ''
    // }
    // function HandleClickToProfilePage(e) {
    //   let history = useHistory(e.target);
    //   history.push('/profile');
    // }
    // function HandClickToMyPostsPage(e) {
    //   let history = useHistory(e.target);
    //   history.push('/my-posts')
    // }
    // function HandleClickToHomePage(e) {
    //   let history = useHistory(e.target);
    //   history.push('/');
    // }
    // https://reactrouter.com/web/api/Hooks; https://stackoverflow.com/questions/51337618/reactjs-modifying-state-and-changing-url-onchange;

    return (
      <ChirpContext.Consumer>
        {(context) => {
          // console.log(context.posts)
          return (
            <div id="mb-container">
              <img src="./pictures/dfkt-nkynQWagL-s-unsplash (1).jpg" alt="bird chirping on a tree branch" />
              <h1 id="mb-page-title">Chirp(En-Passant) Message Board:</h1>
              <img src="search-bar-icon" alt="search bar icon for message board" />
              <div id="mb-links">
                <Link to="/profile">My Profile</Link>
                <Link to="/">Home</Link>
              </div>
              {/* (MVP) <select name="drop-down-for-mb" id="drop-down-for-mb" onChange={e.target}>
              <option value="my-profile" onChange={() => HandleClickToProfilePage}>My Profile</option>
              <option value="my-posts" onChange={() => HandClickToMyPostsPage}>My Posts</option>
              <option value="landing-page" onChange={() => HandleClickToHomePage}>Chirp Home Page</option>
            </select> */}
              {/* view post content, contributors */}
              <table id="mb-table">
                <thead>
                  <tr id="table-row">
                    <th>Title</th>
                    <th>Participants</th>
                    <th># of Messages in Thread</th>
                    <th>Open Since</th>
                  </tr>
                </thead>
                {context.posts.map((post, idx) => {
                  return (
                    // on click, expand to show posts in thread-- reply...edit...delete (MVP)
                    // use the component
                    <Post post={post} />
                  )
                })}
                {/* edit */}
                {context.posts.filter(newPost => {
                  <>
                    <form onSubmit={() => this.context.handleCreatePost}>
                      <label>Chirp:</label>
                      <text placeholder="Free as a bird...">{newPost}</text>
                    </form>
                  </>
                })}
              </table>
              {/* delete */}
            </div>
          )
        }}
      </ChirpContext.Consumer>
    )
  }
}

export default messageBoard;

// Create it in JSX
// create state....method to update state
