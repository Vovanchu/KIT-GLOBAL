import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { PostCard } from "../components/PostCard";
import { FilterBar } from "../components/Filter";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchPosts } from "@/app/features/posts/postSlice";

export const Home = () => {
  const [searchParams] = useSearchParams();
  const searching = searchParams.get("search") || "";
  const author = searchParams.get("author") || "";

  const posts = useSelector((state: RootState) => state.posts.items);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searching.toLowerCase()) ||
      post.content.toLowerCase().includes(searching.toLowerCase());

    const matchesAuthor = post.author
      .toLowerCase()
      .includes(author.toLowerCase());

    return matchesSearch && matchesAuthor;
  });

  return (
    <>
      <FilterBar />
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm mt-16">
          No posts yet. Click{" "}
          <span className="font-medium text-foreground">New Post</span> to
          create one.
        </p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm mt-16">
          No posts match your search.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      )}
    </>
  );
};
