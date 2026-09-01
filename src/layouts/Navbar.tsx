import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const displayName = user?.username ?? "User";
  const primaryRole = user?.roles?.[0] ?? "User";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Brand */}
        <div>
          <h1 className="text-lg font-bold text-slate-900"> Smart Task Manager </h1>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {displayName}
            </p>
            <p className="text-xs text-slate-500">
              {primaryRole}
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >
            Logout </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;