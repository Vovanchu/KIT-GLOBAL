import { Post } from "@/types/Post";
import { Button } from "./ui/button";
import { Edit, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { openModal } from "@/app/features/ui/uiSlice";
import { deletePost, setSelectedPost } from "@/app/features/posts/postSlice";

export const PostCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleToDelete = (postId: string) => {
    dispatch(deletePost(postId as string));
  };

  return (
    <li
      key={post.id}
      className="rounded-xl border border-border bg-card p-5 flex flex-col gap-1"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-row items-center gap-5">
          <h2 className="font-semibold text-base leading-snug">{post.title}</h2>
          <time className="text-xs text-muted-foreground shrink-0 mt-0.5">
            {new Date(post.createdAt).toLocaleString()}
          </time>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              dispatch(openModal({ type: "editPost" }));
              dispatch(setSelectedPost(post));
            }}
            className="cursor-pointer"
            variant="outline"
          >
            <Edit size={16} />
          </Button>

          <Button
            onClick={() => {
              handleToDelete(post.id);
            }}
            className="cursor-pointer"
          >
            <X />
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">by {post.author}</p>
      <p className="text-sm text-foreground/80 mt-1 line-clamp-3">
        {post.content}
      </p>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-muted-foreground">
          {post.commentsCount || 0} comments
        </span>

        <Button
          className="cursor-pointer"
          onClick={() => {
            dispatch(setSelectedPost(post));
            navigate(`/post/${post.id}`);
          }}
        >
          View Comments
        </Button>
      </div>

      <Button
        onClick={() => dispatch(openModal({ type: "addComment" }))}
        className="cursor-pointer"
      >
        Add comment
      </Button>
    </li>
  );
};
