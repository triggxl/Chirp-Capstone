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
        postId: 2,
        postTitle: '26 Days of X-mas?!',
        postContent: '',
        participantsInitials: 'M, K, T, L',
        numOfParticipants: 4,
        numOfReplies: 175,
        replies: [{
          replyId: 1,
          title: 'Karen',
          content: 'That would be great, I wish this holiday was longer!!'
        }],
        timeOpen: '3 weeks'
      },
    ]
  }

  createNewPost = (id, postTitle, postContent) => {
    const newPost = {
      postId: id,
      postTitle: postTitle,
      postContent: postContent,
      participantsInitials: '',
      numOfParticipants: 0,
      numOfReplies: 0, //increment based off addReply for loop... || map iterates through and use counter?
      replies: [],
      timeOpen: 'One minute ago'
    }
    // a cb fx will provide previous state as the callback by default
    this.setState(prevState => {
      // copy of state to modify to prevent mututating and other oddities
      const originalPosts = [...prevState.posts];
      originalPosts.push(newPost)
      return {
        // property changing: new value
        posts: originalPosts
      }
    })
  }

  // finding matching posts with prevState, editing it dynamically with whatever the user inputs and then giving it back to state
  addReply = (postId, content) => {
    const newReply = {
      replyId: 1,
      title: '',
      content: content
    }
    this.setState((prevState) => {
      // finds the post with matching id goes into that post's reply, reconstructing new object within array to account for other properties reply has
      const originalPosts = [...prevState.posts];
      let matchingPost = originalPosts.find(post => post.postId === postId);
      console.log(matchingPost)
      // add new reply to matching post
      matchingPost.replies.push(newReply);
      return {
        posts: originalPosts
      }
    })
  }

  // patch
  handleEditReply = (postId, replyId, reply, replyTitle) => {
    console.log(this.state.replies)
    this.setState(prevState =>
      // exact reply to change
      prevState.posts[postId - 1].replies[replyId - 1] = {
        replyId: replyId,
        title: replyTitle,
        content: reply
      }
    )
  }

  // delete
  handleDeleteReply = (postId, replyId) => {
    this.setState(prevState => {
      delete prevState.posts[postId - 1].replies[replyId - 1]
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
KEEP ALL NOTES FOR EACH FILE BELOW CODE
Date:

Notes:

Completed:

Next Steps:

4/17
[] How to turn these methods into fetch calls?

with the ability for user to create a new post- add, edit, and delete replies to it stored on server
I'm trying to write out my fetch calls to support creating a post, which includes creating, editing, and deleting a reply.
I need help understanding how to store all of this data on a server
CRUD operations are all happening on the same page, no need to route to specific endpoints; operations are just being performed separately
is this accomplishing the same as createNewPost but with an endpoint to store the data on?
how do I tie that endpoint to my database?


Write out API fetch calls + test in postman
Store data in DB

4/16
// reference in service fx for API calls
// exercise: accessing nested properties
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
  // https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

  // data is being stored in App
  // want to keep 1-2 'example' posts on render with ability for user to create their own/reply to example posts
  // unsure of how to seed dummy data from App into seed files with maintaining referential integrity of data structure

Plan:

1.) Get Create Post functionality working
2.) set up API endpoints
3.) Seed database with posts and replies data

Styling:
1.) Get font-awesome library to work

  when creating a post:
    user is able to create a post by clicking 'Create Post' button
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

  // handlers (below) are being referenced through context when used to update state in App
  // how can I tie the handlers to my API requests using fetch() axios() would like to chain each of the promises in

  // fetch to create new post

  can we focus on that part a little bit longer...

4/7

commit after completing each feature

(MVP)
I was wondering if you could help me outline the steps to:
[] 'createPost' component
  make createPost button
  make your createPost component && showAddForm
  fill in JSX
    form
    controlled inputs
    formSubmit handler uses fx in app for submitHandler to call (through context)

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
  learn how to use gitHub pages



Axios request: ((-) all reponses have to complete to run)

(this looks cleaner to me/more organized)
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