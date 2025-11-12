import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Home() {
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
                            href="/trips"
                            className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm"
                        >
                            Open Dispatch
                        </Link>
                        <Link
                            href="/admin/users"
                            className="px-3 py-2 rounded-xl border text-sm"
                        >
                            User Admin
                        </Link>
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl border p-4">
                        <p className="text-xs text-gray-500">Active Trips</p>
                        <p className="text-2xl font-semibold">—</p>
                    </div>
                    <div className="rounded-2xl border p-4">
                        <p className="text-xs text-gray-500">Online Drivers</p>
                        <p className="text-2xl font-semibold">—</p>
                    </div>
                    <div className="rounded-2xl border p-4">
                        <p className="text-xs text-gray-500">
                            Today’s Requests
                        </p>
                        <p className="text-2xl font-semibold">—</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
