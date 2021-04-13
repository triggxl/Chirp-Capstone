const makeNewPostsArray = () => {
  return [
    {
      "id": "b0715efe-ffaf-11e8-8eb2-f2802f1b9fd1",
      "title": "Super",
      "content": "This is an XSS attack"
    },
    {
      "id": "b07161a6-ffaf-11e8-8eb2-f2901f1b9fd1",
      "title": "Important",
      "content": "This is an XSS attack"
    },
  ];
}

function makeMaliciousNewPost() {
  const makeMaliciousNewPost = {
    id: 911,
    name: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
  }
  const expectedNewPost = {
    ...makeMaliciousNewPost,
    id: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    name: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
  }
  return {
    makeMaliciousNewPost: makeMaliciousNewPost,
    expectedReply: expectedNewPost,
  }
}

module.exports = {
  makeNewPostsArray: makeNewPostsArray,
  makeMaliciousNewPost: makeMaliciousNewPost
}