import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chirpContext from '../../chirp-context/chirpContext';
import './Post.css';
import SiteButton from '../site-button';
import UUID from 'react-uuid';
import { API_URL } from '../../config';

class Post extends React.Component {
  static contextType = chirpContext;
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isReplying: false,
      isEdited: false,
      isDeleted: false,
      isSaved: false,
      content: '',
      replies: {
        title: '',
        content: ''
      }
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

    const handleTextareaEdit = (e) => {
      this.setState({ replyToBeEdited: e.target.value })
    }

    const toggleCancel = () => {
      this.setState({
        isEdited: false,
        isReplying: false,
      })
    }

    const buildHandleSave = (e, context) => {
      context.addReply(post.id, e.target.previousElementSibling.value);
      this.setState({ isReplying: false })
    }

    const buildHandleSaveOnEdit = (e, context) => {
      context.editReply(post.id, this.state.replyIdToBeEdited, this.state.replyToBeEdited, this.state.replyTitleToBeEdited)
      this.setState({ isEdited: false })
    }

    // const handleAddedReplyContent = (e) => {
    //   this.setState({
    //     content: e.target.innerText
    //   })
    // }
    const handleFetchCreateReply = (replyId) => {
      const reply = {
        id: UUID(),
        content: this.state.replies.content,
        postId: this.props.post.id
      }
      console.log('reply: post.js 67', reply)
      fetch(`${API_URL}/replies/${replyId}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(reply)
      })
        // .then(res => {
        //   if (!res.ok) {
        //     throw new Error(res.status)
        //   }
        //   return res.json()
        // })
        .then(res => res.json())
        .then(data => console.log('success', data))
        .then(this.context.addReply(this.props.post.id, this.state.content)
        )
        .catch((error) => {
          console.error('error:', error.message)
        })
    }

    const handleFetchEditReply = (replyId, postid) => {
      console.log(this.props.post.id)
      const replies = {
        id: replyId,
        content: this.state.content,
        postid: this.props.post.id
      }
      fetch(`${API_URL}/replies/${replyId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(replies)
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(() => {
          this.context.editReply(replyId, this.state.content, this.props.post.id)
        }
        )
    }

    const handleFetchDeleteReply = (replyId) => {
      fetch(`${API_URL}/replies/${replyId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .catch(error => this.setState({ error }
        ))
        .then(() => this.context.deleteReply(this.props.post.id, this.state.replyId)
        )
        .then(this.setState({ toggleThread: null }))
    }

    return (
      <chirpContext.Consumer>
        {context => {
          console.log(post)
          return (
            < tbody key={post.id}>
              <tr id="tr-threads">
                <td>{post.title}</td>
                <td>{post.participantsInitials}</td>
                <td>{post.numOfReplies}</td>
                <td className="time-open-column">{post.timeOpen}</td>
                <td><button onClick={toggleThread}>⬇</button></td>
              </tr>

              {this.state.showDetails ?
                <>
                  <tr>
                    <td colSpan={6}>{post.content}
                      <section></section>
                      {/* stateful logic to display textarea */}
                      {this.state.isReplying ?
                        <>
                          {/* controlled input pattern */}
                          <form id="create-reply-form" action="POST" onSubmit={(e) => handleFetchCreateReply(e)}>
                            <textarea value={this.state.content}></textarea>
                            <SiteButton onClick={toggleCancel}>Cancel</SiteButton>
                            <SiteButton onClick={(e) => buildHandleSave(e, context)}>Save</SiteButton>
                          </form>
                        </> :
                        // onClick of 'Chirp' buttton opens up form with an empty textbox to render input from user --clicking on 'Save' button will submit user input and add reply to message board 
                        <SiteButton onClick={(e) => handleFetchCreateReply(e)}>Chirp <FontAwesomeIcon icon={['fas', 'blog']} /></SiteButton>
                      }

                    </td>
                  </tr>
                  <tr className="replies-section">
                    <td colSpan={6}>
                      {post.replies.map(reply => {
                        console.log(reply)
                        return (
                          <>
                            {!this.state.isEdited &&
                              <section className="reply-section">{reply.content || 'There was no reply.'}</section>
                            }
                            <div className="thread-btns">
                              {/* document.getElementById = previousElementSibling */}
                              {!this.state.isEdited && <SiteButton onClick={() => handleFetchEditReply(reply.id)}>Edit <FontAwesomeIcon icon={['fas', 'edit']} /> </SiteButton>}
                              {!this.state.isDeleted && !this.state.isEdited && <SiteButton onClick={() => handleFetchDeleteReply(reply.id)}>Drop <FontAwesomeIcon icon={['fas', 'trash']} /></SiteButton>}
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
