import { Head, Link, router, usePage } from "@inertiajs/react";
import { DataGrid } from "@mui/x-data-grid";
import AppLayout from "@/Layouts/AppLayout";

export default function RolesIndex({ roles, filters }) {
    const { flash } = usePage().props;

    const rows = roles.data.map((r) => ({ id: r.id, ...r }));
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Name", flex: 1 },
        {
            field: "permissions_count",
            headerName: "Permissions",
            width: 120,
            renderCell: (params) => (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {params.value} permissions
                </span>
            ),
        },
        {
            field: "users_count",
            headerName: "Users",
            width: 100,
            renderCell: (params) => (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {params.value} users
                </span>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/roles/${params.row.id}/edit`}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => {
                            if (
                                confirm(
                                    "Are you sure? This will remove the role from all users."
                                )
                            ) {
                                router.delete(`/admin/roles/${params.row.id}`);
                            }
                        }}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout title="Roles Management">
            <Head title="Roles" />
            {flash?.success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {flash.success}
                </div>
            )}
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    defaultValue={filters?.search}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            router.get(
                                "/admin/roles",
                                { search: e.target.value },
                                { preserveState: true }
                            );
                        }
                    }}
                    className="px-3 py-2 border rounded"
                />
                <Link
                    href="/admin/roles/create"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create Role
                </Link>
            </div>
            <div style={{ height: 520, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    pageSizeOptions={[10]}
                />
            </div>
        </AppLayout>
    );
}

