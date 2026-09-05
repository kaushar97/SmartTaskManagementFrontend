import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import TasksPage from "../features/tasks/pages/TasksPage";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import AdminPage from "../features/users/AdminPage";
import AppLayout from "../layouts/AppLayout";
import CreateTaskPage from "../features/tasks/pages/CreateTaskPage";
import EditTaskPage from "../features/tasks/pages/EditTaskPage";
import MyTasksPage from "../features/tasks/pages/MyTasksPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/my-tasks" element={<MyTasksPage />} />
        </Route>

        <Route path="/admin"
          element={
            <RoleRoute allowedRoles={["Writer"]}>
              <AdminPage />
            </RoleRoute>
          }
        />

        <Route path="/tasks/create"
          element={
            <RoleRoute allowedRoles={["Writer"]}>
              <CreateTaskPage />
            </RoleRoute>
          }
        />

        <Route path="/tasks/:publicId/edit"
          element={
            <RoleRoute allowedRoles={["Writer"]}>
              <EditTaskPage />
            </RoleRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;