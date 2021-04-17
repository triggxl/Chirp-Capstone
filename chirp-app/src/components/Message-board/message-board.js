import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import { Link } from 'react-router-dom';
import './message-board.css';
import Post from './Post';
import ChirpingBird from '../pictures/chirping-bird.jpg';
import SiteButton from '../site-button';

class messageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatingPost: false,
      showAddForm: false
    }
  }

  render() {
    const handleShowAddForm = () => {
      this.setState({ showAddForm: true })
    }

    const buildHandleSubmitForm = (e, context) => {
      e.preventDefault();
      context.createNewPost(this.state.postTitle, this.state.postContent)
    }

    return (
      <chirpContext.Consumer>
        {(context) => {
          return (
            <div id="mb-container">
              <img src={ChirpingBird} alt="bird chirping on a tree branch" />
              <h1 id="mb-page-title">Chirp(En-Passant) Message Board:</h1>
              {/* <img src="search-bar-icon" alt="search bar icon for message board" /> */}
              <div id="mb-links">
                <Link to="/" key={'/'}>Home</Link>
                <Link to="/profile" key={'/profile'}>My Profile</Link>
              </div>
              {!this.state.showAddForm ?
                <div>
                  <div id="user-instructions">
                    <header>Directions:</header>
                    <p>1.) Click one of the arrows to the right to view a post</p>
                    <p>2.) Click 'Chirp' to share your thoughts in the discussion board! <br /> (You may edit and delete your reply also!- Actual content will be added instead of 'default' posts in next release.) </p>
                  </div>
                  <SiteButton onClick={handleShowAddForm}>Create New Post (Coming Soon!)</SiteButton>
                </div> :
                <form className="form-inline" onSubmit={(e) => buildHandleSubmitForm(e, context)}>
                  {/* eslint-disable-next-line */}
                  <label className="ptl">Title:</label>
                  {/* eslint-disable-next-line */}
                  <input className="post-title" onChange={(e) => this.setState({ postTitle: e.target.value })} value={this.state.postTitle} type="text" id="new-post-title" placeholder="New ish" />
                  {/* eslint-disable-next-line */}
                  <label className="pcl">Topic:</label>
                  {/* eslint-disable-next-line */}
                  <input className="post-content" onChange={(e) => this.setState({ postContent: e.target.value })} value={this.state.postContent} type="text" id="new-post-topic" placeholder="down 4 and 7 beers ago..." />
                  <SiteButton>Chirp!</SiteButton>
                </form>
              }
              <table id="mb-table">
                <thead>
                  <tr id="table-row">
                    <th>Title</th>
                    <th>Participants</th>
                    <th># of Messages in Thread</th>
                    <th className="open-since-column" >Open Since</th>
                  </tr>
                </thead>
                {context.posts.map((post, idx) => {
                  return (
                    <Post post={post} />
                  )
                })}
              </table>
            </div>
          )
        }}
      </chirpContext.Consumer>
    )
  }
}

export default messageBoard;



/*
Endpoints:
Posts
/posts
  create
  read
    GET '/posts
  delete
replies
/replies
  create
    {reply}
  update
  delete
  DELETE/:reply_id
Having trouble assigning db to user Triggxl
could use some help seeding data to db (through migrations I believe?)
setting up API endpoints

/book/book_id
CRUD

// Create it in JSX
// create state....method to update state
/* (MVP) <select name="drop-down-for-mb" id="drop-down-for-mb" onChange={e.target}>
<option value="my-profile" onChange={() => HandleClickToProfilePage}>My Profile</option>
<option value="my-posts" onChange={() => HandClickToMyPostsPage}>My Posts</option>
<option value="landing-page" onChange={() => HandleClickToHomePage}>Chirp Home Page</option>
</select>

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

// figured I need to make a build fx to grab the values on submit (Chirp);
    // console logging to see output to make sure it's the correct element
    // const buildNewPostOnChirp = (e) => {
    //   this.setState({
    //   })
    // }
 */
