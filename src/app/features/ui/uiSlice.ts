import { Post } from "@/types/Post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "" | "addComment" | "createPost" | "editPost";

interface UiState {
  modalType: ModalType;
}

const initialState: UiState = {
  modalType: "",
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{ type: ModalType; data?: Post | null }>,
    ) {
      state.modalType = action.payload.type;
    },
    closeModal(state) {
      state.modalType = "";
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
