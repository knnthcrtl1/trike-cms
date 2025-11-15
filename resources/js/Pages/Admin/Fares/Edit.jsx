import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function EditFare({ fare }) {
    const { data, setData, put, processing, errors } = useForm({
        name: fare.name || '',
        base_fare: fare.base_fare || '',
        per_km_rate: fare.per_km_rate || '',
        per_minute_rate: fare.per_minute_rate || '',
        minimum_fare: fare.minimum_fare || '',
        is_active: fare.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/fares/${fare.id}`);
    };

    return (
        <AppLayout title="Edit Fare">
            <Head title="Edit Fare" />
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
                    <label className="block text-sm font-medium mb-1">Base Fare *</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.base_fare}
                        onChange={(e) => setData('base_fare', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.base_fare && <p className="text-red-500 text-sm mt-1">{errors.base_fare}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Per KM Rate</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.per_km_rate}
                        onChange={(e) => setData('per_km_rate', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.per_km_rate && <p className="text-red-500 text-sm mt-1">{errors.per_km_rate}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Per Minute Rate</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.per_minute_rate}
                        onChange={(e) => setData('per_minute_rate', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.per_minute_rate && <p className="text-red-500 text-sm mt-1">{errors.per_minute_rate}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Minimum Fare *</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.minimum_fare}
                        onChange={(e) => setData('minimum_fare', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                    {errors.minimum_fare && <p className="text-red-500 text-sm mt-1">{errors.minimum_fare}</p>}
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
                        href="/admin/fares"
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}

