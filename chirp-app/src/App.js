import React from 'react';
import { Route } from 'react-router-dom';
import landingPage from './components/Landing-page/landing-page';
import messageBoard from './components/Message-board/message-board';
import profilePage from './components/Profile-page/profile-page';
import ChirpContext from './chirp-context/chirpContext';
import './App.css';

class App extends React.Component {
  static contextType = ChirpContext;
  state = {
    // showThread: false,
    // createNewThread: [{
    //   mbTitle: '',
    //   content: '',
    //   isPosted: false
    // }],
    posts: [
      {
        postTitle: 'Best Editor EVER!',
        participantsIntials: 'M, K',
        numOfParticipants: 2,
        numOfReplies: 27,
        timeOpen: '2 days'
      },
      {
        postTitle: '26 Days of X-mas?!',
        participantsIntials: 'M, K, T, L',
        numOfParticipants: 4,
        numOfReplies: 175,
        timeOpen: '3 weeks'
      },
      {
        postTitle: 'Top Specialities in Tech',
        participantsIntials: 'K, M, L, S, S.A',
        numOfParticipants: 5,
        numOfReplies: 67,
        timeOpen: '3 days'
      },
      {
        postTitle: 'My First Project EVER! (Share and Discuss)',
        participantsIntials: 'M, K, A, B, T, D, L',
        numOfParticipants: 7,
        numOfReplies: 184,
        timeOpen: '2 months'
      },
      {
        postTitle: 'AMA Forum',
        participantsIntials: 'M, K, D, B, S',
        numOfParticipants: 5,
        numOfReplies: 12,
        timeOpen: '3 hours'
      }
    ]
  }

  handleCreatePost = (post) => {
    // look up configuration on MDN/ write pseduocode first
    this.setState(post)
  }
  handleEditPost = () => {

  }
  handleDeletePost = () => {

  }

  render() {
    const contextValue = {
      posts: this.state.posts,
      handleCreatePost: this.handleCreatePost,
      handleEditPost: this.handleEditPost,
      handleDeletePost: this.handleDeletePost
    }

    return (
      <ChirpContext.Provider value={contextValue}>
        {/* <Link to="/message-board">Let's Get Started!</Link> */}
        <Route exact path="/" component={landingPage}>
        </Route>
        <Route path="/message-board" component={messageBoard}>
        </Route>
        <Route path="/profile" component={profilePage}>
        </Route>
      </ChirpContext.Provider>
    );
  }

}

export default App;


