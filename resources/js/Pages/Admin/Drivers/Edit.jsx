import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function EditDriver({ driver }) {
    const { data, setData, put, processing, errors } = useForm({
        name: driver.name || '',
        email: driver.email || '',
        password: '',
        phone: driver.phone || '',
        license_number: driver.license_number || '',
        vehicle_type: driver.vehicle_type || '',
        vehicle_plate: driver.vehicle_plate || '',
        is_active: driver.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/drivers/${driver.id}`);
    };

    return (
        <AppLayout title="Edit Driver">
            <Head title="Edit Driver" />
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">License Number *</label>
                    <input
                        type="text"
                        value={data.license_number}
                        onChange={(e) => setData('license_number', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.license_number && <p className="text-red-500 text-sm mt-1">{errors.license_number}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Type *</label>
                    <input
                        type="text"
                        value={data.vehicle_type}
                        onChange={(e) => setData('vehicle_type', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.vehicle_type && <p className="text-red-500 text-sm mt-1">{errors.vehicle_type}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Plate *</label>
                    <input
                        type="text"
                        value={data.vehicle_plate}
                        onChange={(e) => setData('vehicle_plate', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.vehicle_plate && <p className="text-red-500 text-sm mt-1">{errors.vehicle_plate}</p>}
                </div>

                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="mr-2"
                        />
                        <span>Active</span>
                    </label>
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        Update
                    </button>
                    <Link
                        href="/admin/drivers"
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}

