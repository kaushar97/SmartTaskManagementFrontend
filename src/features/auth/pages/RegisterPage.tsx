import { Link, useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleRegisterSuccess = () => {
        navigate("/login");
    };

    return (
        <div>
            <h1>Create Account</h1>

            <RegisterForm
                onSuccess={handleRegisterSuccess}
            />
            <p>
    Already have an account?{" "}
    <Link to="/login">
        Login
    </Link>
</p>
        </div>
    );
}