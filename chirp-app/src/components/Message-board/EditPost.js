import React from 'react';

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      isEdited: false
    }
  }
  render() {
    return (
      <div>Edit Post</div>
    )
  }
}

export default EditPost;