import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { PostPage } from "../Pages/PostPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
};
