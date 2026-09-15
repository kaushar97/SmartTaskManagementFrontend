import { Info, Mail } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function RoleInfoBanner() {
    const { user } = useAuth();

    const isReader =
        user?.roles?.includes("Reader") ?? false;

    if (!isReader) {
        return null;
    }

    return (
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
                aria-hidden="true"
            />

            <div className="min-w-0">
                <p className="font-medium text-blue-900">
                    Need the Writer role?
                </p>

                <p className="mt-1 text-sm leading-6 text-blue-700">
                    Your current role is Reader. To request the{" "}
                    <span className="font-semibold">Writer</span> role,
                    please contact us at{" "}
                    <a
                        href="mailto:abc@gmail.com"
                        className="inline-flex items-center gap-1 font-semibold text-blue-800 underline decoration-blue-300 underline-offset-2 transition hover:text-blue-950 hover:decoration-blue-500"
                    >
                        <Mail
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                        mdkaushar416@gmail.com
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}