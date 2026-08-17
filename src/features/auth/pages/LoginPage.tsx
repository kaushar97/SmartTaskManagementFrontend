import { Link, useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
    return (
        <div className="login-page">
            <h1>Sign In</h1>

            <p>
                Welcome back! Please sign in to continue.
            </p>

            <LoginForm onSuccess={() => navigate("/dashboard")}/>

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>
        </div>
    );
}