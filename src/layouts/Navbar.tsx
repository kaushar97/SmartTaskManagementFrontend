import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/dashboard">
        <strong>Smart Task Management</strong>
      </Link>

      <div>
        <span style={{ marginRight: "1rem" }}>
          {user?.username}
        </span>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;