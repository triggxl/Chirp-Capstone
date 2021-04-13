import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chirpContext from '../../chirp-context/chirpContext';
import './Post.css';
import SiteButton from '../site-button';

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

    const toggleThread = () => {
      this.setState({
        showDetails: !this.state.showDetails
      })
    }

    const toggleEdit = (e, replyId, replyName) => {
      this.setState({
        isEdited: true,
        isReplying: false,
        isDeleted: false,
        replyToBeEdited: e.target.parentElement.previousElementSibling.innerText,
        replyIdToBeEdited: replyId,
        replyNameToBeEdited: replyName
      })
    }

    const handleTextareaEdit = (e) => {
      this.setState({ replyToBeEdited: e.target.value })
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

    const buildToggleDelete = (context, replyId) => (e) => {
      if (!window.confirm('This reply will be deleted.')) return
      this.setState({
        // find reply that matches post && remove it
        isDeleted: true,
        isEdited: false,
        isReplying: false,
      })
      context.deleteReply(post.postId, replyId)

    }

    const buildHandleSave = context => (e) => {
      context.addReply(post.postId, e.target.previousElementSibling.value);
      this.setState({ isReplying: false })
    }

    const buildHandleSaveOnEdit = context => (e) => {
      context.editReply(post.postId, this.state.replyIdToBeEdited, this.state.replyToBeEdited, this.state.replyNameToBeEdited)
      this.setState({ isEdited: false })
    }


    return (
      <chirpContext.Consumer>
        {context => {
          return (
            < tbody key={post.postId}>
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
                    <td colspan={6}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at velit eu erat dapibus molestie. Duis lorem mi, facilisis id consequat eleifend, rutrum vel dolor.
                    <section></section>
                      {/* stateful logic to display textarea */}
                      {this.state.isReplying ?
                        <>
                          <textarea></textarea>
                          <SiteButton onClick={buildHandleSave(context)}>Save</SiteButton>
                        </> :
                        // onClick of 'Chirp' buttton opens up form with an empty textbox to render input from user --clicking on 'Save' button will submit user input and add reply to message board 
                        <SiteButton onClick={handleChirp}>Chirp <FontAwesomeIcon icon={['fas', 'blog']} /></SiteButton>
                      }
                    </td>
                  </tr>
                  <tr className="replies-section" key={post.replies.name}>
                    <td colspan={6}>
                      {post.replies.map(reply => {
                        return (
                          <>
                            {!this.state.isEdited &&
                              <section className="reply-section">{reply.content}</section>
                            }
                            <div className="thread-btns">
                              {/* document.getElementById = previousElementSibling */}
                              {!this.state.isEdited && <SiteButton onClick={(e) => toggleEdit(e, reply.replyId, reply.name)}>Edit <FontAwesomeIcon icon={['fas', 'edit']} /> </SiteButton>}
                              {!this.state.isDeleted && !this.state.isEdited && <SiteButton onClick={buildToggleDelete(context, reply.replyId)}>Drop <FontAwesomeIcon icon={['fas', 'trash']} /></SiteButton>}
                            </div>
                          </>
                        )
                      })}
                    </td>
                  </tr>
                  {this.state.isEdited ? (
                    <tr>
                      <td colspan={6}>
                        {/* siblings are vertical */}
                        <textarea value={this.state.replyToBeEdited} onChange={handleTextareaEdit} />
                        <div>
                          <SiteButton onClick={toggleCancel}>Cancel</SiteButton>
                          <SiteButton onClick={buildHandleSaveOnEdit(context)}>Save</SiteButton> {/* saves updated post, changes state variable from true to false */}
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
