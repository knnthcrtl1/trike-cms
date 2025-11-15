import { Head, Link, router, usePage } from "@inertiajs/react";
import { DataGrid } from "@mui/x-data-grid";
import AppLayout from "@/Layouts/AppLayout";

export default function DriversIndex({ drivers, filters }) {
    const { flash } = usePage().props;

    const rows = drivers.data.map((r) => ({ id: r.id, ...r }));
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phone", headerName: "Phone", width: 150 },
        { field: "license_number", headerName: "License", width: 150 },
        { field: "vehicle_type", headerName: "Vehicle Type", width: 150 },
        { field: "vehicle_plate", headerName: "Plate", width: 120 },
        { 
            field: "is_active", 
            headerName: "Status", 
            width: 100,
            renderCell: (params) => (
                <span className={params.value ? "text-green-600" : "text-red-600"}>
                    {params.value ? "Active" : "Inactive"}
                </span>
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <Link
                        href={`/admin/drivers/${params.row.id}/edit`}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure?')) {
                                router.delete(`/admin/drivers/${params.row.id}`);
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
        <AppLayout title="Drivers Management">
            <Head title="Drivers" />
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
                        if (e.key === 'Enter') {
                            router.get('/admin/drivers', { search: e.target.value }, { preserveState: true });
                        }
                    }}
                    className="px-3 py-2 border rounded"
                />
                <Link
                    href="/admin/drivers/create"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create Driver
                </Link>
            </div>
            <div style={{ height: 520, width: "100%" }}>
                <DataGrid rows={rows} columns={columns} pagination pageSizeOptions={[10]} />
            </div>
        </AppLayout>
    );
}

