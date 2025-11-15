import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function EditRole({ role, permissions, permissionsGrouped }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name || '',
        permissions: role.permissions || [],
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`);
    };

    const togglePermission = (permissionId) => {
        if (data.permissions.includes(permissionId)) {
            setData('permissions', data.permissions.filter(id => id !== permissionId));
        } else {
            setData('permissions', [...data.permissions, permissionId]);
        }
    };

    const toggleGroup = (groupPermissions) => {
        const groupIds = groupPermissions.map(p => p.id);
        const allSelected = groupIds.every(id => data.permissions.includes(id));
        
        if (allSelected) {
            setData('permissions', data.permissions.filter(id => !groupIds.includes(id)));
        } else {
            const newPermissions = [...new Set([...data.permissions, ...groupIds])];
            setData('permissions', newPermissions);
        }
    };

    return (
        <AppLayout title="Edit Role">
            <Head title="Edit Role" />
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Role Name</label>
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
                    <label className="block text-sm font-medium mb-3">Permissions</label>
                    <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
                        {Object.entries(permissionsGrouped || {}).map(([group, groupPermissions]) => (
                            <div key={group} className="mb-4 last:mb-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-700 capitalize">{group}</h4>
                                    <button
                                        type="button"
                                        onClick={() => toggleGroup(groupPermissions)}
                                        className="text-xs text-blue-600 hover:text-blue-800"
                                    >
                                        {groupPermissions.every(p => data.permissions.includes(p.id)) 
                                            ? 'Deselect All' 
                                            : 'Select All'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {groupPermissions.map((permission) => (
                                        <label
                                            key={permission.id}
                                            className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.permissions.includes(permission.id)}
                                                onChange={() => togglePermission(permission.id)}
                                                className="mr-2"
                                            />
                                            <span className="text-sm text-gray-700">{permission.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                        {(!permissionsGrouped || Object.keys(permissionsGrouped).length === 0) && (
                            <div className="space-y-2">
                                {permissions?.map((permission) => (
                                    <label
                                        key={permission.id}
                                        className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.permissions.includes(permission.id)}
                                            onChange={() => togglePermission(permission.id)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">{permission.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    {errors.permissions && <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        Update Role
                    </button>
                    <Link
                        href="/admin/roles"
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}


