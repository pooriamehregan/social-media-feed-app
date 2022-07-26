import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = 
  createAsyncThunk('posts/fetchPosts', async () => {
    const respons = await client.get('/fakeApi/posts')
    return respons.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async initialPost => {
    const respons = await client.post('/fakeApi/posts', initialPost)
    return respons.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action) {
      const post = state.posts.find(post => post.id === action.payload.id)
      post.titel = action.payload.title
      post.content = action.payload.content
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer;

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => 
  state.posts.posts.find(post => post.id === postId)
