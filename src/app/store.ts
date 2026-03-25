import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";
import commentsReducer from "./features/comments/commentsSlice";
import uiReducer from "./features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
