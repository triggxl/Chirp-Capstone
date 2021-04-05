import React from 'react';
import { Route } from 'react-router-dom';
import landingPage from './components/Landing-page/landing-page';
import messageBoard from './components/Message-board/message-board';
import profilePage from './components/Profile-page/profile-page';
import chirpContext from './chirp-context/chirpContext';
import './App.css';

class App extends React.Component {
  static contextType = chirpContext;
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
          replyId: 1,
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
          replyId: 1,
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
          replyId: 1,
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
        replies: [
          {
            replyId: 1,
            name: 'Derek says:',
            content: 'What is the last song you listened to?'
          },
          {
            replyId: 2,
            name: 'Austin says:',
            content: 'Californication brother!'
          },
        ],
        timeOpen: '3 hours'
      }
    ]
  }

  addReply = (postId, reply) => {
    this.setState((prevState) => {
      // setting information: finds the post with matching id goes into that post's reply and adds a reply object with the content being the reply because it's structured as an array of object
      let matchingPost = prevState.posts.find(post => post.postId === postId)
      prevState.posts[postId - 1].replies.push({
        content: reply,
        replyId: matchingPost.replies.length + 1
      })
      return prevState
    })
    // how to replace the matchingPost with the post you just created, how to replace the information creating an object that mimics my replies object. need to create an id to push it to your state
  }

  handleEditReply = (postId, replyId, reply, replyName) => {
    this.setState(prevState =>
      // exact reply to change
      prevState.posts[postId - 1].replies[replyId - 1] = {
        replyId: replyId,
        name: replyName,
        content: reply
      }
    )
  }

  handleDeleteReply = (postId) => {
    const deletedPost = this.state.posts.filter(post => post.postId !== postId)
    this.setState({
      posts: deletedPost
    })
  }

  render() {
    const contextValue = {
      posts: this.state.posts,
      addReply: this.addReply,
      editReply: this.handleEditReply,
      handleCreatePost: this.handleCreatePost,
      handleEditPost: this.handleEditPost,
      handleDeletePost: this.handleDeletePost
    }
    return (
      <chirpContext.Provider value={contextValue}>
        <Route exact path="/" component={landingPage}>
        </Route>
        <Route path="/message-board" component={messageBoard}>
        </Route>
        <Route path="/profile" component={profilePage}>
        </Route>
      </chirpContext.Provider>
    );
  }
}
export default App;


