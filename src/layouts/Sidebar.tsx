import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Sidebar = () => {
  const { hasRole } = useAuth();

  return (
    <aside
      style={{
        width: "220px",
        borderRight: "1px solid #ccc",
        padding: "1rem",
      }}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/tasks">
              My Tasks
            </NavLink>
          </li>

          {hasRole("Writer") && (
            <>
              <li>
                <NavLink to="/admin"> //tasks
                  Manage Tasks
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin"> //tasks/create
                  Create Task
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin"> //users
                  Users
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;