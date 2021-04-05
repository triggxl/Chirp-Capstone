import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import { Link, useHistory } from 'react-router-dom';
import './../../App.css';
import Post from './Post';

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
      <chirpContext.Consumer>
        {(context) => {
          return (
            <div id="mb-container">
              <img src="./pictures/dfkt-nkynQWagL-s-unsplash (1).jpg" alt="bird chirping on a tree branch" />
              <h1 id="mb-page-title">Chirp(En-Passant) Message Board:</h1>
              <img src="search-bar-icon" alt="search bar icon for message board" />
              <div id="mb-links">
                <Link to="/profile">My Profile</Link>
                <Link to="/">Home</Link>
              </div>
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
                    <Post post={post} />
                  )
                })}
                {/* edit (breaking code)*/}
                {/* {context.posts.filter(newPost => {
                  return (
                    <>
                      <form onSubmit={() => this.context.handleCreatePost}>
                        <label>Chirp:</label>
                        <text placeholder="Free as a bird...">{newPost}</text>
                      </form>
                    </>
                  )
                })} */}
              </table>
              {/* delete */}
            </div>
          )
        }}
      </chirpContext.Consumer>
    )
  }
}

export default messageBoard;

// Create it in JSX
// create state....method to update state
{/* (MVP) <select name="drop-down-for-mb" id="drop-down-for-mb" onChange={e.target}>
              <option value="my-profile" onChange={() => HandleClickToProfilePage}>My Profile</option>
              <option value="my-posts" onChange={() => HandClickToMyPostsPage}>My Posts</option>
              <option value="landing-page" onChange={() => HandleClickToHomePage}>Chirp Home Page</option>
            </select> */}
