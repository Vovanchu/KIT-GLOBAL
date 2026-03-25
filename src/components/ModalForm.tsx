import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { CommentsForm } from "./CommentsForm";
import { PostForm } from "./PostForm";
import { Dialog } from "./ui/dialog";
import { openModal } from "@/app/features/ui/uiSlice";

export function CreatePostModal() {
  const modalType = useSelector((state: RootState) => state.ui.modalType);
  const dispatch = useDispatch<AppDispatch>();

  if (modalType === "") return null;

  return (
    <Dialog
      open={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) dispatch(openModal({ type: "" }));
      }}
    >
      {modalType === "addComment" ? <CommentsForm /> : <PostForm />}
    </Dialog>
  );
}
