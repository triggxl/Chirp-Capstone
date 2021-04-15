CREATE TABLE replies ( 
  replyId INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  postId INTEGER NOT NULL,
  postId FOREIGN KEY REFERENCES posts(postId)
)