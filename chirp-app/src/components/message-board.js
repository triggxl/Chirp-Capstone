import React from 'react';
import ChirpContext from '../chirp-context/chirpContext';
import { Link, useHistory } from 'react-router-dom';

const messageBoard = () => {

  function HandleRouteToProfilePage() {
    let history = useHistory();
    history.push('/profile');
  }
  function HandRouteToMyPostsPage() {
    let history = useHistory();
    history.push('/my-posts')
  }
  function HandleRouteToHomePage() {
    let history = useHistory();
    history.push('/');
  }

  return (
    <ChirpContext.Consumer>
      {(context) => {
        return (
          <div id="mb-container">
            <img src="./pictures/dfkt-nkynQWagL-s-unsplash (1).jpg" alt="bird chirping on a tree branch" />
            <h1 id="mb-page-title">Chirp (En-Passant) Message Board:</h1>
            <img src="search-bar-icon" alt="search bar icon for message board" />
            <select name="drop-down-for-mb" id="drop-down-for-mb">
              <option value="my-profile">
                <Link to="/profile">
                  <button onChange={HandleRouteToProfilePage}>My Profile</button>
                </Link></option>
              <option value="my-posts">
                <Link to="/posts">
                  <button onChange={HandRouteToMyPostsPage}>My Posts</button>
                </Link></option>
              <option value="landing-page">
                <Link to="/">
                  <button onChange={HandleRouteToHomePage}>Chirp Home Page</button>
                </Link>
              </option>
            </select>
            {/* view post content, contributors */}
            <table id="mb-table">
              <tr>
                <th>Title</th>
                <th>Participants</th>
                <th># of Participants</th>
                <th># of Messages in Thread</th>
                <th>Open Since</th>
              </tr>
              <tr>
                <td>Best Editor EVER!</td>
                <td>M, K</td>
                <td>2</td>
                <td>27</td>
                <td>2d</td>
              </tr>
              <tr>
                <td>26 Days of X-mas?!</td>
                {/* <!-- avatar/user beside each inital/ silouhette with inital?--> */}
                <td>M, K, T, L</td>
                <td>4</td>
                <td>359</td>
                <td>3wk</td>
              </tr>
              <tr>
                <td>Top Specialities in Tech</td>
                <td>K, M, L, S, S.A</td>
                <td>6</td>
                <td>67</td>
                <td>3d</td>
              </tr>
              <tr>
                <td>My First Project EVER! (Share and Discuss)</td>
                <td>M, K, A, B, T, D, L</td>
                <td>7</td>
                <td>184</td>
                <td>23hr</td>
              </tr>
              <tr>
                <td>AMA Forum</td>
                <td>M, K, D, B, S</td>
                <td>5</td>
                <td>12</td>
                <td>3 hours</td>
              </tr>
            </table>
          </div>
        )
      }}
    </ChirpContext.Consumer>
  )
}

export default messageBoard
