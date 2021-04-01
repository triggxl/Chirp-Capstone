import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isEdited: false,
      isDeleted: false
    }
  }
  render() {
    const { post } = this.props;

    const toggleThread = () => {
      this.setState({
        showDetails: !this.state.showDetails
      })
    }

    const toggleEdit = () => {
      this.setState({
        isEdited: !this.state.isEdited[post.replies.content]
      })
    }

    const toggleDelete = () => {
      this.setState({
        isDeleted: !this.state.isDeleted
      })
    }

    const handleChirp = () => {
      // creating ui for reply
      const reply = {
        author: 'Me',
        message: 'Working'
      }
      return reply
    }

    const handleDeletePost = () => {
      const deletedPost = post.replies.filter(reply => reply.id)
      this.setState({

      })
    }

    // state variable...handler (render in JSX)...updateState inside handler (onChange, onClick)
    return (
      <tbody key={post.postId}>
        <tr id="tr-threads">
          <td>{post.postTitle}</td>
          <td>{post.participantsIntials}</td>
          <td>{post.numOfReplies}</td>
          <td>{post.timeOpen}</td>
          <td><button onClick={toggleThread}>⬇</button></td>
        </tr>
        {/* learn how to make a simple modal in react when button is clicked run modal, when submit run service function and close*/}
        {/* build out component and render some functionality ie: text box */}
        {/* display post depending on number of ids? */}

        {this.state.showDetails ?
          <>
            {/* post component with array of replies and the post itself that updates all of the post/reply logic locally */}
            <tr>
              <td colspan='6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at velit eu erat dapibus molestie. Duis lorem mi, facilisis id consequat eleifend, rutrum vel dolor.
                            <section></section>
                <button onClick={() => handleChirp(post.postId)}>Chirp <FontAwesomeIcon icon={['fas', 'blog']} /></button>
              </td>
            </tr>
            {/* chirp add text box react dialogue create form to add chirp and the submit and add to forum start with hardcoded then make state varaibles make sure wireframes cover all user stories that your app needs*/}
            <tr id="replies-section" key={post.replies.name}>
              {console.log(post.replies)}
              <td>
                {post.replies.map(reply => {
                  return <>{reply.content}</>
                })}
              </td>
              <div id="thread-btns">
                {!this.state.isEdited && <button onClick={toggleEdit}>Edit <FontAwesomeIcon icon={['fas', 'edit']} /> </button>}
              </div>
            </tr>
            {/* edit */}
            {this.state.isEdited ? (
              <tr>
                <td>
                  <textarea onClick={() => toggleEdit} value={post.replies.content}></textarea>
                  <button>Cancel</button><button onClick={handleDeletePost}>Save</button> {/* saves updated post, changes state variable from true to false */}
                </td>
              </tr>
            )
              : null
            }
            {/* delete */}
            {this.state.isDeleted ? (
              <tr>
                <td>
                  <button onClick={this.context.handleDeletePost}>Drop <FontAwesomeIcon icon={['fas', 'trash']} /></button>
                  {/* prompt */}
                </td>
              </tr>
            )
              : null
            }
          </> : null
        }
      </tbody>
    )
  }
}

export default Post