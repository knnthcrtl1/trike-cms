import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-black/90" />
                        <span className="text-xl font-semibold">Trike CMS</span>
                    </Link>
                </div>
                <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
                    {children}
                </div>
                <p className="mt-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Trike CMS
                </p>
            </div>
        </div>
    );
}
