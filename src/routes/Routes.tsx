import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/error";
import UserPage from "../pages/user";
import AlbumPage from "../pages/album";
import Layout from "../components/Layout";
import PostPage from "../pages/post";
import PostDetailPage from "../pages/postDetail";
import PhotoPage from "../pages/photo";
import PhotoDetailPage from "../pages/photoDetail";
import EditPostPage from "../pages/editPost";
import AddPostPage from "../pages/addPost";
import EditCommentPage from "../pages/editComment/editComment";
import AddCommentpage from "../pages/addComment";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/users",
        element: <UserPage />,
        errorElement: <Error />,
      },
      {
        path: "/users/:id/posts",
        element: <PostPage />,
        errorElement: <Error />,
      },
      {
        path: "/users/:id/albums",
        element: <AlbumPage />,
        errorElement: <Error />,
      },
      {
        path: "/posts/:id",
        element: <PostDetailPage />,
        errorElement: <Error />,
      },
      {
        path: "/albums/:id/photos",
        element: <PhotoPage />,
        errorElement: <Error />,
      },
      {
        path: "/photos/:id",
        element: <PhotoDetailPage />,
        errorElement: <Error />,
      },
      {
        path: "/users/:id/posts/create",
        element: <AddPostPage />,
        errorElement: <Error />,
      },
      {
        path: "/posts/:id/edit",
        element: <EditPostPage />,
        errorElement: <Error />,
      },
      {
        path: "/comments/:id/edit",
        element: <EditCommentPage />,
        errorElement: <Error />,
      },
      {
        path: "/posts/:id/comments/create",
        element: <AddCommentpage />,
        errorElement: <Error />,
      },
    ],
  },
]);
