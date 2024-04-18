import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes/Routes";
import Layout from "./components/Layout";

export default function App() {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  );
}
