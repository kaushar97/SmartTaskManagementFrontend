import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";

interface RoleRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleRoute = ({
  children,
  allowedRoles,
}: RoleRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Checking authorization...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = user.roles.some((role) =>
    allowedRoles.includes(role)
  );

  if (!hasRequiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;