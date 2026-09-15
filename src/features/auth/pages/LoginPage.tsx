import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-sm">
                        ST
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900"> Smart Task Manager </h1>
                    <p className="mt-2 text-sm text-slate-500"> Manage your work. Stay productive. </p>
                </div>
                {/* Login Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                    <div className="mb-6"> 
                        <h2 className="text-xl font-semibold text-slate-900"> 
                            Welcome back 
                        </h2>
                        <p className="mt-1 text-sm text-slate-500"> Sign in to continue to your account. </p>
                    </div>
                    <LoginForm onSuccess={() => navigate("/dashboard")} />
                </div>
                <p className="mt-6 text-center text-xs text-slate-400"> Smart Task Manager </p>
            </div>
        </div>
    );
}

