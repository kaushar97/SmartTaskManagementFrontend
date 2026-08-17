import { useAuth } from "../hooks/useAuth";

const AuthTest = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
  } = useAuth();

  const handleLogin = async () => {
    try {
      await login("email", "password");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isLoading) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div>
      <h1>Authentication Test</h1>

      <p>
        Authenticated: {isAuthenticated ? "Yes" : "No"}
      </p>

      {user && (
        <div>
          <h2>User Information</h2>

          <p>
            Identity User ID: {user.identityUserId}
          </p>

          <p>
            Email: {user.email}
          </p>

          <p>
            Username: {user.username}
          </p>

          <p>
            Roles: {user.roles.join(", ")}
          </p>

          <p>
            Is Admin: {hasRole("Writer") ? "Yes" : "No"}
          </p>
        </div>
      )}

      {!isAuthenticated ? (
        <button onClick={handleLogin}>
          Test Login
        </button>
      ) : (
        <button onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default AuthTest;