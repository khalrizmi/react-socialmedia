import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex mx-auto max-w-5xl min-h-screen">
      <div className="block w-full max-w-screen-xl px-4 py-2 mx-auto border shadow-md  lg:px-8 lg:py-4">
        <Header />
        <main className="mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
