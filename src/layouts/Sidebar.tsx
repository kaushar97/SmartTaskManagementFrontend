import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  const isWriter =
    user?.roles?.includes("Writer") ?? false;

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return [
      "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    ].join(" ");
  };

  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="flex h-full flex-col p-4">

        {/* Navigation */}
        <nav className="space-y-1">

          <NavLink
            to="/dashboard"
            className={getNavLinkClass}
          >
            <span className="mr-3">⌂</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={getNavLinkClass}
          >
            <span className="mr-3">▣</span>
            Tasks
          </NavLink>

          <NavLink
            to="/my-tasks"
            className={getNavLinkClass}
          >
            <span className="mr-3">✓</span>
            My Tasks
          </NavLink>

          {isWriter && (
            <NavLink
              to="/admin"
              className={getNavLinkClass}
            >
              <span className="mr-3">⚙</span>
              Admin
            </NavLink>
          )}

          {isWriter && (
            <NavLink
              to="/tasks/create"
              className={getNavLinkClass}
            >
              <span className="mr-3">＋</span>
              Create Task
            </NavLink>)}

        </nav>

        {/* Bottom Section */}
        <div className="mt-auto border-t border-slate-200 pt-4">
          <p className="px-4 text-xs font-medium uppercase tracking-wider text-slate-400">
            Smart Task Manager
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;