import React from 'react';

const chirpContext = React.createContext({
  mbTitle: [],
  showThread: [],
  createNewThread: [],
  posts: [],
  handleCreateThread: ()=> {},
  handleCreatePost: ()=> {},
  handleEditPost: ()=> {},
  handleDeletePost: ()=> {}
})

export default chirpContext;