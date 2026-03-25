import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  fetchComments,
  removeComment,
} from "@/app/features/comments/commentsSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { openModal } from "@/app/features/ui/uiSlice";
import { X } from "lucide-react";

export const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const selectedPost = useSelector(
    (state: RootState) => state.posts.selectedPost,
  );

  const comments = useSelector((state: RootState) => state.comments.items);

  useEffect(() => {
    if (selectedPost?.id) {
      dispatch(fetchComments(selectedPost?.id));
    }
  }, [selectedPost?.id]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <header className="mb-6 border-b border-border pb-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {selectedPost?.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          by {selectedPost?.author} •{" "}
          {new Date(selectedPost?.createdAt || 0).toLocaleString()}
        </p>
      </header>

      <div className="bg-card p-6 rounded-lg border border-border text-foreground mb-6">
        {selectedPost?.content}
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-foreground">
            Comments ({selectedPost?.commentsCount || 0})
          </h2>

          <Button
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              if (selectedPost) {
                dispatch(openModal({ type: "addComment", data: selectedPost }));
              }
            }}
          >
            Add Comment
          </Button>
        </div>

        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card border border-border rounded-lg p-4 text-foreground flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0 hover:bg-muted transition-colors"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{comment.author}</span>
                  <time className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleString()}
                  </time>
                </div>
                <p className="text-sm leading-relaxed">{comment.content}</p>
              </div>

              <div className="flex items-start ml-4">
                <Button
                  size="icon"
                  className="p-2 rounded-full cursor-pointer"
                  onClick={() => {
                    if (selectedPost?.id) {
                      dispatch(
                        removeComment({
                          id: comment.id,
                          postId: selectedPost.id,
                        }),
                      );
                    }
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </section>

      <div className="mt-6">
        <Button className="cursor-pointer" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};
