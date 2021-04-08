import React from 'react';
import chirpContext from '../../chirp-context/chirpContext';
import { Link } from 'react-router-dom';
import './message-board.css';
import Post from './Post';
import ChirpingBird from '../pictures/chirping-bird.jpg';
import SiteButton from '../site-button';


class messageBoard extends React.Component {
  state = {
    isCreatingPost: false,
    showAddForm: false
  }
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

    const showAddForm = () => {
      this.setState({ showAddForm: true })
    }
    const handleSubmitForm = context => (post) => {
      context.createNewPost(post.postId, this.state.postTitle, this.state.postContent)
      this.setState({
        isCreatingPost: true
      })
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
              <form className="form-inline" onSubmit={handleSubmitForm(context)}>
                <label className="ptl">Post Title:</label>
                <input className="post-title" onChange={(e) => this.setState({ postTitle: e.target.value })} value={this.state.postTitle} type="text" id="new-post-title" value="New ish" />
                <label className="pcl">Topic:</label>
                <input className="post-content" onChange={(e) => this.setState({ postContent: e.target.value })} value={this.state.postContent} type="text" id="new-post-topic" value="down 4 and 7 beers ago..." />
              </form>
              {showAddForm ? <SiteButton onClick={showAddForm}>Create New Post</SiteButton> : null}
              <table id="mb-table">
                <thead>
                  <tr id="table-row">
                    <th>Title</th>
                    <th>Participants</th>
                    <th># of Messages in Thread</th>
                    <th className="open-since-column">Open Since</th>
                  </tr>
                </thead>
                {context.posts.map((post, idx) => {
                  return (
                    <Post post={post} />
                  )
                })}
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
/* (MVP) <select name="drop-down-for-mb" id="drop-down-for-mb" onChange={e.target}>
<option value="my-profile" onChange={() => HandleClickToProfilePage}>My Profile</option>
<option value="my-posts" onChange={() => HandClickToMyPostsPage}>My Posts</option>
<option value="landing-page" onChange={() => HandleClickToHomePage}>Chirp Home Page</option>
</select> */
