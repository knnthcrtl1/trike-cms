import { Head, useForm, Link } from "@inertiajs/react";
import { DataGrid } from "@mui/x-data-grid";

export default function TripsIndex({ trips }) {
    const rows = trips.data.map((r) => ({ id: r.id, ...r }));
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "user", headerName: "User", flex: 1 },
        { field: "driver", headerName: "Driver", flex: 1 },
        { field: "pickup", headerName: "Pickup", flex: 1 },
        { field: "dropoff", headerName: "Dropoff", flex: 1 },
        { field: "status", headerName: "Status", width: 140 },
        { field: "fare", headerName: "Fare", width: 120 },
    ];

    return (
        <div className="p-6">
            <Head title="Trips" />
            <h1 className="text-2xl font-semibold mb-4">Dispatch — Trips</h1>
            <div style={{ height: 520, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    pageSizeOptions={[10]}
                />
            </div>
            <div className="mt-4 flex gap-2">
                <Link
                    href={trips.links.prev ?? "#"}
                    className="px-3 py-1 rounded bg-gray-200"
                >
                    Prev
                </Link>
                <Link
                    href={trips.links.next ?? "#"}
                    className="px-3 py-1 rounded bg-gray-200"
                >
                    Next
                </Link>
            </div>
        </div>
    );
}
