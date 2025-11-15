import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function EditUser({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        phone: user.phone || '',
        license_number: user.license_number || '',
        vehicle_type: user.vehicle_type || '',
        vehicle_plate: user.vehicle_plate || '',
        is_active: user.is_active ?? true,
        roles: user.roles || [],
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    const roles = ['admin', 'dispatcher', 'driver', 'user'];

    return (
        <AppLayout title="Edit User">
            <Head title="Edit User" />
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
                    <label className="block text-sm font-medium mb-1">License Number</label>
                    <input
                        type="text"
                        value={data.license_number}
                        onChange={(e) => setData('license_number', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Type</label>
                    <input
                        type="text"
                        value={data.vehicle_type}
                        onChange={(e) => setData('vehicle_type', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Plate</label>
                    <input
                        type="text"
                        value={data.vehicle_plate}
                        onChange={(e) => setData('vehicle_plate', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
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

                <div>
                    <label className="block text-sm font-medium mb-1">Roles</label>
                    <div className="space-y-2">
                        {roles.map(role => (
                            <label key={role} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.roles.includes(role)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData('roles', [...data.roles, role]);
                                        } else {
                                            setData('roles', data.roles.filter(r => r !== role));
                                        }
                                    }}
                                    className="mr-2"
                                />
                                <span className="capitalize">{role}</span>
                            </label>
                        ))}
                    </div>
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
                        href="/admin/users"
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}

