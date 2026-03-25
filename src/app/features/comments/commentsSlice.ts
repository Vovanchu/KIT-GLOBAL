import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCommentsFromFirestore,
  addCommentToFirestore,
  updateCommentInFirestore,
  deleteCommentFromFirestore,
} from "./commentsAPI";
import { Comment, Comments } from "@/types/comments";
import { AppDispatch, RootState } from "@/app/store";
import { fetchPostById, updatePostCommentsCount } from "../posts/postSlice";

type ThunkConfig = { dispatch: AppDispatch };

export const fetchComments = createAsyncThunk<Comment[], string>(
  "comments/fetchComments",
  async (postId: string) => {
    return await fetchCommentsFromFirestore(postId);
  },
);

export const createComment = createAsyncThunk<
  Comment,
  Omit<Comment, "id">,
  ThunkConfig
>("comments/createComment", async (comment, { dispatch, getState }) => {
  const newComment = await addCommentToFirestore(comment);

  const state = getState() as RootState;
  const selectedPost = state.posts.items.find(
    (p) => p.id === newComment.postId,
  );

  if (selectedPost) {
    dispatch(
      updatePostCommentsCount({
        postId: newComment.postId,
        newCount: (selectedPost.commentsCount || 0) + 1,
      }),
    );
  }

  return newComment;
});

export const editComment = createAsyncThunk<Comment, Comment, ThunkConfig>(
  "comments/editComment",
  async (comment, { dispatch }) => {
    await updateCommentInFirestore(comment);
    await dispatch(fetchComments(comment.postId));
    return comment;
  },
);

export const removeComment = createAsyncThunk<
  string,
  { id: string; postId: string },
  ThunkConfig
>("comments/removeComment", async ({ id, postId }, { dispatch, getState }) => {
  await deleteCommentFromFirestore(id);

  // Оновлюємо commentsCount у Redux store поста
  const state = getState() as RootState;
  const post = state.posts.items.find((p) => p.id === postId);

  if (post) {
    dispatch(
      updatePostCommentsCount({
        postId,
        newCount: Math.max((post.commentsCount || 1) - 1, 0),
      }),
    );
  }

  return id;
});

// --- Slice ---
interface CommentsState {
  items: Comments;
}

const initialState: CommentsState = { items: [] };

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comments>) => {
          state.items = action.payload;
        },
      )
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.unshift(action.payload);
        },
      )
      .addCase(
        editComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items = state.items.map((c) =>
            c.id === action.payload.id ? action.payload : c,
          );
        },
      )
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter((c) => c.id !== action.payload);
        },
      );
  },
});

export default commentsSlice.reducer;
