import React from 'react';

class DeletePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isEdited: false
    }
  }
  render() {
    return (
      <div>Delete Post</div>
    )
  }
}

export default DeletePost;