import React from 'react';
import ChirpContext from '../../chirp-context/chirpContext';
import { Link, useHistory } from 'react-router-dom';
import './message-board.css'

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
          console.log(context.posts)
          return (
            <div id="mb-container">
              <img src="./pictures/dfkt-nkynQWagL-s-unsplash (1).jpg" alt="bird chirping on a tree branch" />
              <h1 id="mb-page-title">Chirp (En-Passant) Message Board:</h1>
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
                <tr id="table-row">
                  <th>Title</th>
                  <th>Participants</th>
                  <th># of Participants</th>
                  <th># of Messages in Thread</th>
                  <th>Open Since</th>
                </tr>
                {context.posts.map((post, idx) => {
                  return (
                    // on click, expand to show posts in thread-- reply...edit...delete (MVP)
                    <tr>
                      <td>{post.postTitle}</td>
                      <td>{post.participantsIntials}</td>
                      <td>{post.numOfParticipants}</td>
                      <td>{post.numOfReplies}</td>
                      <td>{post.timeOpen}</td>
                    </tr>
                  )
                })}
              </table>
            </div>
          )
        }}
      </ChirpContext.Consumer>
    )
  }
}

export default messageBoard
