import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPostsFromFirestore,
  addPostToFirestore,
  updatePostInFirestore,
  deletePostFromFirestore,
  fetchPostFromFirestore,
} from "./postAPI";
import { Post } from "@/types/Post";

// Thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await fetchPostsFromFirestore();
});

export const fetchPostById = createAsyncThunk<Post, string>(
  "posts/fetchPostById",
  async (postId: string) => {
    const post = await fetchPostFromFirestore(postId);
    if (!post) throw new Error("Post not found");
    return post;
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post: Omit<Post, "id">) => {
    return await addPostToFirestore(post);
  },
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (post: Post) => {
    await updatePostInFirestore(post);
    return post;
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    await deletePostFromFirestore(id);
    return id;
  },
);

// Slice
interface PostsState {
  items: Post[];
  selectedPost: Post | null;
}

const initialState: PostsState = { items: [], selectedPost: null };

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },
    updatePostCommentsCount: (
      state,
      action: PayloadAction<{ postId: string; newCount: number }>,
    ) => {
      const post = state.items.find((p) => p.id === action.payload.postId);
      if (post) {
        post.commentsCount = action.payload.newCount;
      }
      if (state.selectedPost?.id === action.payload.postId) {
        state.selectedPost.commentsCount = action.payload.newCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.items = state.items.map((p) =>
        p.id === action.payload.id ? action.payload : p,
      );
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    });
  },
});

export const { setSelectedPost, updatePostCommentsCount } = postSlice.actions;
export default postSlice.reducer;
