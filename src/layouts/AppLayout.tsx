import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "2rem",
          }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;