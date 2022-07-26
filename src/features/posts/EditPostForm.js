import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUpdated, selectPostById } from "./postsSlice";
import { useHistory } from "react-router-dom";

export const EditPostForm = ({ match }) => {
  const {postId} = match.params
  const dispatch = useDispatch()
  const history = useHistory()

  const post = useSelector(state => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content
        })
      )
      history.push(`/posts/${postId}`)
    }
  }

  return (
      <section>
        <h2>Update This Post</h2>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <textarea 
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <button type="button" onClick={onSavePostClicked}>Save Post</button>
        </form>
      </section>
  )
} 