import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function CreateRoute() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        origin: '',
        destination: '',
        distance_km: '',
        estimated_duration_minutes: '',
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/routes');
    };

    return (
        <AppLayout title="Create Route">
            <Head title="Create Route" />
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
                    <label className="block text-sm font-medium mb-1">Origin</label>
                    <input
                        type="text"
                        value={data.origin}
                        onChange={(e) => setData('origin', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Destination</label>
                    <input
                        type="text"
                        value={data.destination}
                        onChange={(e) => setData('destination', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Distance (km)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.distance_km}
                        onChange={(e) => setData('distance_km', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.distance_km && <p className="text-red-500 text-sm mt-1">{errors.distance_km}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Estimated Duration (minutes)</label>
                    <input
                        type="number"
                        value={data.estimated_duration_minutes}
                        onChange={(e) => setData('estimated_duration_minutes', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.estimated_duration_minutes && <p className="text-red-500 text-sm mt-1">{errors.estimated_duration_minutes}</p>}
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
                        Create
                    </button>
                    <Link
                        href="/admin/routes"
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}

