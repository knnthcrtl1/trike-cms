import { Link, useForm } from "@inertiajs/react";

export default function AppLayout({ children, title = "Home", user }) {
    const { post } = useForm({});
    const logout = (e) => {
        e.preventDefault();
        post("/logout");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                    <Link href="/" className="font-semibold">
                        Trike CMS
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Home
                        </Link>
                        <Link
                            href="/dispatch/trips"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Dispatch
                        </Link>
                        {user?.roles?.includes('admin') && (
                            <>
                                <Link
                                    href="/admin/users"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Users
                                </Link>
                                <Link
                                    href="/admin/drivers"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Drivers
                                </Link>
                                <Link
                                    href="/admin/routes"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Routes
                                </Link>
                                <Link
                                    href="/admin/fares"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Fares
                                </Link>
                            </>
                        )}
                        {user && (
                            <form onSubmit={logout}>
                                <button className="text-sm text-gray-600 hover:text-gray-900">
                                    Logout
                                </button>
                            </form>
                        )}
                    </nav>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">{title}</h1>
                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                    {children}
                </div>
            </main>
        </div>
    );
}
