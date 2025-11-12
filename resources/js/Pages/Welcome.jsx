import { Head, Link } from "@inertiajs/react";

export default function Welcome({
    canLogin,
    canRegister,
    laravelVersion,
    phpVersion,
}) {
    return (
        <>
            <Head title="Trike CMS | Smart Dispatch System" />
            <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-50 to-gray-100">
                {/* Header */}
                <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Trike<span className="text-gray-500">CMS</span>
                    </h1>
                    <nav className="flex items-center gap-4 text-sm">
                        {canLogin && (
                            <Link
                                href="/login"
                                className="text-gray-700 hover:text-black font-medium"
                            >
                                Login
                            </Link>
                        )}
                        {canRegister && (
                            <Link
                                href="/register"
                                className="text-gray-700 hover:text-black font-medium"
                            >
                                Register
                            </Link>
                        )}
                    </nav>
                </header>

                {/* Hero section */}
                <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Simplify Tricycle Dispatching
                    </h2>
                    <p className="text-gray-600 max-w-xl mb-6">
                        A modern dispatch and management platform built for
                        tricycle cooperatives and transport groups — connecting
                        dispatchers, drivers, and commuters efficiently.
                    </p>

                    <div className="flex gap-4">
                        {canLogin ? (
                            <Link
                                href="/login"
                                className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-black transition"
                            >
                                Get Started
                            </Link>
                        ) : null}
                        {canRegister ? (
                            <Link
                                href="/register"
                                className="border border-gray-900 text-gray-900 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-900 hover:text-white transition"
                            >
                                Join Now
                            </Link>
                        ) : null}
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center text-xs text-gray-500 py-4 border-t bg-white">
                    <p>
                        © {new Date().getFullYear()} Trike CMS — Laravel{" "}
                        {laravelVersion} • PHP {phpVersion}
                    </p>
                </footer>
            </div>
        </>
    );
}
