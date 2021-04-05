import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chirpContext from '../../chirp-context/chirpContext';
import './Post.css'

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isReplying: false,
      isEdited: false,
      isDeleted: false,
      replyToBeEdited: '',
      replyIdToBeEdited: -1,
      replyNameToBeEdited: '',
      replyIdToBeDeleted: -1,
      replyNameToBeDeleted: ''
    }
  }
  render() {
    const { post } = this.props;

    const toggleThread = () => {
      this.setState({
        showDetails: !this.state.showDetails
      })
    }

    const toggleEdit = (e, replyId, replyName) => {
      console.log(e)
      this.setState({
        // statePropety: value from function
        isEdited: true,
        replyToBeEdited: e.target.parentElement.previousElementSibling.innerText,
        replyIdToBeEdited: replyId,
        replyNameToBeEdited: replyName
      })
    }

    // handling logic for updating reply (moved functionalty over to app and then called editReply fx within Post)
    // const handleSave = (e) => {
    // calls fx from app
    //what info does handleSave need?
    // the id of the post
    // know which reply (replyId)
    // text from the input field

    // how do you use that info to solve the problem
    // find the correct post // how: find postId
    // find the correct reply
    // find replyId // update reply //assign reply with new data

    // post.postId, postId
    // post.replies[replyId - 1].replyId, replyId
    // DOM traversal: (S) Save button (E) textarea
    // innerText vs. value
    // let matchingPostId = post.postId;
    // console.log(matchingPostId)
    // let matchingReplyId = this.state.replyIdToBeEdited;
    // console.log(matchingReplyId)
    // let editedReply = e.target.parentNode.firstChild.value;
    // console.log(editedReply)
    // let replyName;
    // this.setState({
    //   isEdited: false,
    //   isReplying: false,
    //   replyToBeEdited: ''
    // })
    // }

    // ToDo's: 4/2
    // textarea should appear and nothing else -->
    // textarea should close and new text should render 
    // delete button is being removed instead of text upon click of 'drop'
    // drop button shouldn't appear upon clicking edit
    const toggleDelete = (e, replyId, replyName) => {
      console.log(e.target.parentElement.previousElementSibling.innerText)
      this.setState({
        // find reply that matches post && remove it
        isDeleted: true,
        replyToBeDeleted: e.target.parentElement.previousElementSibling.innerText,
        isDeleted: !this.state.isDeleted,
        replyIdToBeDeleted: replyId,
        replyNameToBeDeleted: replyName
      })
    }

    const toggleCancel = () => {
      this.setState({
        isEdited: false
      })
    }

    const handleChirp = () => {
      // creating ui for reply
      this.setState({
        isReplying: true
      })
    }

    return (
      <chirpContext.Consumer>
        {context => {
          return (
            < tbody key={post.postId}>
              <tr id="tr-threads">
                <td>{post.postTitle}</td>
                <td>{post.participantsIntials}</td>
                <td>{post.numOfReplies}</td>
                <td>{post.timeOpen}</td>
                <td><button onClick={toggleThread}>⬇</button></td>
              </tr>

              {this.state.showDetails ?
                <>
                  <tr>
                    <td colspan='6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at velit eu erat dapibus molestie. Duis lorem mi, facilisis id consequat eleifend, rutrum vel dolor.
                    <section></section>
                      {/* add stateful logic to display textarea */}
                      {this.state.isReplying ?
                        <><textarea></textarea> <button onClick={(e) => { context.addReply(post.postId, e.target.previousElementSibling.value); }}>Save</button></> :
                        // onClick of 'Chirp' buttton opens up form with an empty textbox to render input from user --clicking on 'Save' button will submit user input and add reply to message board 
                        <button onClick={handleChirp}>Chirp <FontAwesomeIcon icon={['fas', 'blog']} /></button>}
                    </td>
                  </tr>
                  <tr id="replies-section" key={post.replies.name}>
                    <td>
                      {post.replies.map(reply => {
                        return (
                          <>
                            <section>{reply.content}</section>
                            <div id="thread-btns">
                              {/* document.getElementById = previousElementSibling */}
                              {!this.state.isEdited && <button onClick={(e) => toggleEdit(e, reply.replyId, reply.name)}>Edit <FontAwesomeIcon icon={['fas', 'edit']} /> </button>}
                              {!this.state.isDeleted && <button onClick={(e) => toggleDelete(e.target.parentElement.previousElementSibling.innerText, reply.replyId, reply.name)}>Drop <FontAwesomeIcon icon={['fas', 'trash']} /></button>}
                            </div>
                          </>
                        )
                      })}
                    </td>
                  </tr>
                  {/* edit figure out how to replace a reply with the text area that you're conditionally rendering */}
                  {this.state.isEdited ? (
                    <tr>
                      <td>
                        {/* siblings are vertical */}
                        <textarea>{this.state.replyToBeEdited}</textarea>
                        <button onClick={toggleCancel}>Cancel</button>
                        <button onClick={(e) => context.editReply(post.postId, this.state.replyIdToBeEdited, e.target.parentNode.firstChild.value, this.state.replyNameToBeEdited)}>Save</button> {/* saves updated post, changes state variable from true to false */}
                      </td>
                    </tr>
                  ) : null
                  }
                  {/* delete */}
                  {this.state.isDeleted ? (
                    <tr>
                      <td>
                        {/* prompt */}
                        {window.confirm('This post will be deleted.')}
                      </td>
                    </tr>
                  )
                    : !this.state.isReplying
                  }
                </> : null
              }
            </tbody>
          )
        }}
      </chirpContext.Consumer>
    )
  }
}

export default Post
