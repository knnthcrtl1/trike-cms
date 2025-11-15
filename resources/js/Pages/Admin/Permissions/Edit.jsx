import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function EditPermission({ permission }) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/permissions/${permission.id}`);
    };

    return (
        <AppLayout title="Edit Permission">
            <Head title="Edit Permission" />
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Permission Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Use dot notation for grouping (e.g., users.create, users.edit, trips.view)
                    </p>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        Update Permission
                    </button>
                    <Link
                        href="/admin/permissions"
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}


