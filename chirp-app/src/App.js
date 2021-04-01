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
        postId: 1,
        postTitle: 'Best Editor EVER!',
        participantsIntials: 'M, K',
        numOfParticipants: 2,
        numOfReplies: 27,
        replies: [{
          replyId: 1,
          name: 'Mike says:',
          content: 'This is a great post!'
        }],
        timeOpen: '2 days'
      },
      {
        postId: 2,
        postTitle: '26 Days of X-mas?!',
        participantsIntials: 'M, K, T, L',
        numOfParticipants: 4,
        numOfReplies: 175,
        replies: [{
          replyId: 2,
          name: 'Karen says:',
          content: 'That would be great, I wish this holiday was longer!!'
        }],
        timeOpen: '3 weeks'
      },
      {
        postId: 3,
        postTitle: 'Top Specialities in Tech',
        participantsIntials: 'K, M, L, S, S.A',
        numOfParticipants: 5,
        numOfReplies: 67,
        replies: [{
          replyId: 3,
          name: 'Kris',
          content: 'Cyber security is a popular speciality now-a-days'
        }],
        timeOpen: '3 days'
      },
      {
        postId: 4,
        postTitle: 'My First Project EVER! (Share and Discuss)',
        participantsIntials: 'M, K, A, B, T, D, L',
        numOfParticipants: 7,
        numOfReplies: 184,
        replies: [{
          replyId: 4,
          name: 'Bob',
          content: 'This was my first post ever, check it out...'
        }],
        timeOpen: '2 months'
      },
      {
        postId: 5,
        postTitle: 'AMA Forum',
        participantsIntials: 'M, K, D, B, S',
        numOfParticipants: 5,
        numOfReplies: 12,
        replies: [{
          replyId: 5,
          name: 'Derek',
          content: 'What is the last song you listened to?'
        }],
        timeOpen: '3 hours'
      }
    ]
  }
  handleEditPost = (updatedPost, postId) => {

    // const editedPost =
    // grab existing post
    // compare changes to old
    // set old to new post

  }
  handleDeletePost = (postId) => {
    const deletedPost = this.state.posts.filter(post => post.postId !== postId)

    this.setState({
      posts: deletedPost
    })
  }

  render() {
    // console.log(this.state.posts.length)
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


