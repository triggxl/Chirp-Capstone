import React from 'react';
import { Route } from 'react-router-dom';
import landingPage from './components/Landing-page/landing-page';
import messageBoard from './components/Message-board/message-board';
import profilePage from './components/Profile-page/profile-page';
import chirpContext from './chirp-context/chirpContext';
import './App.css';
// check relative paths
class App extends React.Component {
  static contextType = chirpContext;
  state = {
    posts: [
      {
        postId: 1,
        postTitle: 'Best Editor EVER!',
        participantsInitials: 'M, K',
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
        participantsInitials: 'M, K, T, L',
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
        participantsInitials: 'K, M, L, S, S.A',
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
        participantsInitials: 'M, K, A, B, T, D, L',
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
        participantsInitials: 'M, K, D, B, S',
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

  createNewPost = (postTitle, postContent) => {
    const newPost = this.setState({
      //  use UUID pass UUID --> would include in .then(setState({...UUID})) to give to server
      postId: Math.random(),
      postTitle: postTitle,
      postContent: postContent
    })
    return newPost
  }

  addReply = (postId, reply) => {
    this.setState((prevState) => {
      // finds the post with matching id goes into that post's reply, reconstructing new object within array to account for other properties reply has
      let matchingPost = prevState.posts.find(post => post.postId === postId)
      prevState.posts[postId - 1].replies.push({
        content: reply,
        replyId: matchingPost.replies.length + 1
      })
      return prevState
    })
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


  handleDeleteReply = (postId, replyId) => {
    // const deletedPost = this.state.posts.filter(post => post.postId !== postId)
    this.setState(prevState => {
      delete prevState.posts[postId - 1].replies[replyId - 1]
      console.log(prevState, postId - 1, replyId - 1)
      return prevState
    }
    )
  }

  render() {
    const contextValue = {
      posts: this.state.posts,
      createNewPost: this.createNewPost,
      addReply: this.addReply,
      editReply: this.handleEditReply,
      deleteReply: this.handleDeleteReply,
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


/*
4/7

commit after completing each feature

(MVP)
I was wondering if you could help me outline the steps to:
[] 'createPost' component
  make createPost button
  make route tag for /createPost
  make your createPost component && showAddForm
  fill in JSX
    form
    controlled inputs
    formSubmit handler uses fx in app for submitHanlder to call (through context)

[] give ability to log in as different users

events issues:
  [x]reply isn't appearing upon save
  [x]edit/delete: TypeError: Cannot read property 'innerText' of null
[x]not seeing styling for button in site-button component
want to hide openSince column with smaller screen sizes

Node Js Interview next Monday
  // express: handle all routes, make router, make middleware,
  // knex how to make tables, alter, make foreign keys


Thinkful Sessions:
  package-lock.json: keep all my files locked at this version
  process.env says run my environmental variable on whatever server I'm on
  vercel --prod skips preview step and deploys in one step
  how to use gitHub pages
*/