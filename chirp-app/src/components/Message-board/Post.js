import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chirpContext from '../../chirp-context/chirpContext';
import './Post.css';
import SiteButton from '../site-button';
import UUID from 'react-uuid';
import { API_URL } from '../../config';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isReplying: false,
      isEdited: false,
      isDeleted: false,
      isSaved: false,
    }
  }
  render() {
    const { post } = this.props;
    // bring outside of render
    const toggleThread = () => {
      this.setState({
        showDetails: !this.state.showDetails
      })
    }

    // const toggleEdit = (e, replyId, replyTitle) => {
    //   console.log(toggleEdit)
    //   this.setState({
    //     isEdited: true,
    //     isReplying: false,
    //     isDeleted: false,
    //     replyToBeEdited: e.target.parentElement.previousElementSibling.innerText,
    //     replyIdToBeEdited: replyId,
    //     replyTitleToBeEdited: replyTitle
    //   })
    // }

    const handleTextareaEdit = (e) => {
      this.setState({ replyToBeEdited: e.target.value })
    }

    const toggleCancel = () => {
      console.log(toggleCancel)
      this.setState({
        isEdited: false,
        isReplying: false
      })
    }

    // const handleChirp = () => {
    //   // creating ui for reply
    //   this.setState({
    //     isReplying: true
    //   })
    // }

    // const buildToggleDelete = (e, context, replyId) => {
    //   if (!window.confirm('This reply will be deleted.')) return
    //   this.setState({
    //     // find reply that matches post && remove it
    //     isDeleted: true,
    //     isEdited: false,
    //     isReplying: false,
    //   })
    //   context.deleteReply(post.id, replyId)
    // }

    const buildHandleSave = (e, context) => {
      context.addReply(post.id, e.target.previousElementSibling.value);
      this.setState({ isReplying: false })
    }

    const buildHandleSaveOnEdit = (e, context) => {
      context.editReply(post.id, this.state.replyIdToBeEdited, this.state.replyToBeEdited, this.state.replyTitleToBeEdited)
      this.setState({ isEdited: false })
    }

    const handleFetchCreateReply = () => {
      const createReply = {
        id: UUID(),
        postTitle: '',
        postContent: '',
        participantsInitials: '',
        numOfParticipants: 0,
        numOfReplies: 0,
        replies: [{
          replyId: UUID(),
          title: this.state.replies.title,
          content: this.state.replies.content,
        }],
        timeOpen: 'One minute ago'
      }
      let data = { createReply }
      fetch(`${API_URL}/replies`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      }).catch(error => this.setState({ error }
      )).then(this.context.addReply(this.state.postId, this.state.postContent)
      )
    }

    const handleFetchEditReply = () => {
      const editReply = {
        id: UUID(),
        postTitle: this.state.postTitle,
        postContent: this.state.postContent,
        participantsInitials: '',
        numOfParticipants: 0,
        numOfReplies: 0,
        replies: [{
          replyId: UUID(),
          title: this.state.title,
          content: this.state.content,
        }],
        timeOpen: 'One minute ago'
      }
      fetch(`${API_URL}/replies`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(editReply)
      }).then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      }).catch(error => this.setState({ error }
      )).then(() => this.context.editReply(this.state.id, this.state.replyId, this.state.replies.title, this.state.replies.content)
      )
    }

    const handleFetchDeleteReply = () => {
      const deletedReply = {
        id: this.state.postId,
        replies: [{
          replyId: this.state.replyId,
        }],
        timeOpen: 'One minute ago'
      }
      fetch(`${API_URL}/replies`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(deletedReply)
      }).then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      }).catch(error => this.setState({ error }
      )).then(() => this.context.deleteReply(this.state.postId, this.state.replyId)
      )
    }

    return (
      <chirpContext.Consumer>
        {context => {
          return (
            < tbody key={post.id}>
              <tr id="tr-threads">
                <td>{post.postTitle}</td>
                <td>{post.participantsInitials}</td>
                <td>{post.numOfReplies}</td>
                <td className="time-open-column">{post.timeOpen}</td>
                <td><button onClick={toggleThread}>⬇</button></td>
              </tr>

              {this.state.showDetails ?
                <>
                  <tr>
                    <td colSpan={6}>{post.postContent}
                      <section></section>
                      {/* stateful logic to display textarea */}
                      {this.state.isReplying ?
                        <>
                          <textarea></textarea>
                          <SiteButton onClick={toggleCancel}>Cancel</SiteButton>
                          <SiteButton onClick={(e) => buildHandleSave(e, context)}>Save</SiteButton>
                        </> :
                        // onClick of 'Chirp' buttton opens up form with an empty textbox to render input from user --clicking on 'Save' button will submit user input and add reply to message board 
                        <SiteButton onClick={(e) => handleFetchCreateReply(e)}>Chirp <FontAwesomeIcon icon={['fas', 'blog']} /></SiteButton>
                      }
                    </td>
                  </tr>
                  <tr className="replies-section" key={post.replies.title}>
                    <td colSpan={6}>
                      {post.replies.map(reply => {
                        return (
                          <>
                            {!this.state.isEdited &&
                              <section className="reply-section">{reply.content}</section>
                            }
                            <div className="thread-btns">
                              {/* document.getElementById = previousElementSibling */}
                              {!this.state.isEdited && <SiteButton onClick={handleFetchEditReply()}>Edit <FontAwesomeIcon icon={['fas', 'edit']} /> </SiteButton>}
                              {!this.state.isDeleted && !this.state.isEdited && <SiteButton onClick={(e) => handleFetchDeleteReply(e)}>Drop <FontAwesomeIcon icon={['fas', 'trash']} /></SiteButton>}
                            </div>
                          </>
                        )
                      })}
                    </td>
                  </tr>
                  {this.state.isEdited ? (
                    <tr>
                      <td colSpan={6}>
                        {/* siblings are vertical */}
                        <textarea value={this.state.replyToBeEdited} onChange={handleTextareaEdit} />
                        <div>
                          <SiteButton onClick={toggleCancel}>Cancel</SiteButton>
                          <SiteButton onClick={(e) => buildHandleSaveOnEdit(e, context)}>Save</SiteButton>
                        </div>
                      </td>
                    </tr>
                  ) : null
                  }
                </> : null
              }
            </tbody>
          )
        }
        }
      </chirpContext.Consumer >
    )
  }
}

export default Post;



// handling logic for updating reply (moved functionalty over to app and then called editReply fx within Post)
// const handleSave = (e) => {
// calls fx from app
//what info does handleSave need?
// the id of the post
// know which reply (replyId)
// text from the input field

// how do you use that info to solve the problem
// find the correct post // how: find id
// find the correct reply
// find replyId // update reply //assign reply with new data

// post.id, id
// post.replies[replyId - 1].replyId, replyId
// DOM traversal: (S) Save button (E) textarea
// innerText vs. value
// let matchingid = post.id;
// console.log(matchingid)
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
