import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Home({ metrics }) {
    const { props } = usePage();
    const user = props?.auth?.user;

    return (
        <AppLayout title="Home" user={user}>
            <Head title="Home" />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Welcome back</p>
                        <h2 className="text-xl font-semibold">
                            {user?.name ?? "Guest"}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/dispatch/trips"
                            className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm"
                        >
                            Open Dispatch
                        </Link>
                        {user?.roles?.includes('admin') && (
                            <Link
                                href="/admin/users"
                                className="px-3 py-2 rounded-xl border text-sm"
                            >
                                Admin Panel
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-2xl border p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-600 font-medium mb-1">Total Trips Today</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {metrics?.totalTripsToday ?? 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border p-6 bg-gradient-to-br from-green-50 to-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-600 font-medium mb-1">Active Drivers</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {metrics?.activeDrivers ?? 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-600 font-medium mb-1">Completed Trips</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {metrics?.completedTripsToday ?? 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-600 font-medium mb-1">Revenue Today</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    ₱{metrics?.revenueToday ?? '0.00'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
