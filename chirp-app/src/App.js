// import axios from 'axios';
// import UUID from 'react-uuid';
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

  // componentDidMount() {
  //   // 
  //   axios.post('/posts', {
  //     data: {
  //       postId: UUID,
  //       postTitle: postTitle,
  //       postContent: postContent
  //     },
  //   })
  //   axios.get('/posts', {
  //     // 
  //   })
  //   axios.put('/posts', {
  //     // 
  //   })
  // }
  // componentWillUnmount() {
  //   axios.delete('/posts', {
  //     // 
  //   })
  // }
  // data is being stored in App
  // want to keep 1-2 'example' posts on render with ability for user to create their own/reply to example posts
  // unsure of how to seed dummy data from App into seed files with maintaining referential integrity of data structure

  /*
Plan:
  (feature is not yet working fully, need a fresh set of eyes to debug)
  when creating a post:
    user is able to create Post by clicking 'Create Post' button
        brings up title and content fields 
          user enters in a title for the post
          user enter in content for the post
          user clicks 'Chirp'
            title and content information are captured by form 
              how: using value= {e.target.value}
            value is then passed to handler fx in component 
              how: onSubmit={e, handleChirp}
            handler function updates variable in App using context
          form closes and new post is rendered
  */
  /*
  when replying to a post:
    user is able to reply
      clicking on the 'Chirp' button
        displays an input field with 'cancel' and 'save' buttons at the button corners
          if user clicks Cancel:
            input field disappears
          if user clicks Save:
            grab input from form 
              how: using e.target.value to target the user's input in all given fields
              that input will be passed to a handler fx to update state using setState (through a fetch in that component?)
              which will then be passed through context to handler fx back in App where that state variable needs to be stored
            input field disappears
    user is able to edit reply
      clicks 'Edit' button
          displays an input field with 'cancel' and 'save' buttons at the button corners
            if user clicks Cancel:
              input field disappears
             if user clicks Save:
            grab input from form
              compare values to original
                if different:
              how: using e.target.value to target the user's new input in the textfield
              that input will be passed to a handler fx to update state using setState if (through a fetch in that component?)
              which will then be passed through context to handler fx back in App where that state variable needs to be stored
            input field disappears
      user is able to delete reply
        clicks 'Delete' button
          prompt confirms deletion of reply
          if user clicks 'Cancel':
            window prompt disappears
          if user clicks 'Ok':
            reply is deleted
              how: 
                event is fired in buildToggleDelete
                updates state by using the deleteReply handler in App
   */

  // handlers (below) are being referenced through context when used to update state in App
  // how can I tie the handlers to my API requests using fetch() axios() would like to chain each of the promises in 
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
    // handle fetch

    // this.setState((prevState) => {
    //   // finds the post with matching id goes into that post's reply, reconstructing new object within array to account for other properties reply has
    //   let matchingPost = prevState.posts.find(post => post.postId === postId)
    //   prevState.posts[postId - 1].replies.push({
    //     content: reply,
    //     replyId: matchingPost.replies.length + 1
    //   })
    //   return prevState
    // })
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



Axios request:

let apiPosts = "https://api.chirp-app/posts";
let apiReplies = "https://api.chirp-app/replies";

const requestPosts = axios.get(apiPosts)
const requestReplies = axios.get(apiReplies)

axios
  .all([requestPosts, requestReplies])
  .then(
    axios.spread((...reponses) => {
      const responsesCreatePost = responses[0];
      const responsesEditPost = responses[1];
      const responsesDeletePost = responses[2];
      const responsesCreateReply = responses[3];
      const responsesEditReply = responses[4];
      const responsesDeleteReply = responses[5];

      //use/access the results (setState?)
      console.log(responsesCreatePost, responsesEditPost, responsesDeletePost, responsesCreateReply, responsesEditReply, responsesDeleteReply)
    })
  )
*/