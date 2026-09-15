import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleRegisterSuccess = () => {
        navigate("/login");
    };

   return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
            <div className="w-full max-w-lg">

                {/* Brand */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-sm">
                        ST
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Smart Task Manager
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage your work. Stay productive.
                    </p>
                </div>

                {/* Register Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Create your account
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Get started with Smart Task Manager.
                        </p>
                    </div>

                    <RegisterForm
                        onSuccess={handleRegisterSuccess}
                    />

                    
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Smart Task Manager
                </p>
            </div>
        </div>
    );
}