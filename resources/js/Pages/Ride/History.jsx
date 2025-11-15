import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function RideHistory({ trips }) {
    const getStatusColor = (status) => {
        const colors = {
            requested: 'bg-yellow-100 text-yellow-800',
            assigned: 'bg-blue-100 text-blue-800',
            accepted: 'bg-purple-100 text-purple-800',
            in_progress: 'bg-indigo-100 text-indigo-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatStatus = (status) => {
        return status.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <AppLayout title="My Rides">
            <Head title="My Rides" />
            <div className="space-y-4">
                {trips && trips.length > 0 ? (
                    <div className="space-y-3">
                        {trips.map((trip) => (
                            <div
                                key={trip.id}
                                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(trip.status)}`}>
                                                {formatStatus(trip.status)}
                                            </span>
                                            {trip.fare && (
                                                <span className="text-sm font-semibold text-gray-900">
                                                    ₱{parseFloat(trip.fare).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">From:</span>
                                                <span className="text-gray-900 font-medium">{trip.pickup}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">To:</span>
                                                <span className="text-gray-900 font-medium">{trip.dropoff}</span>
                                            </div>
                                            {trip.driver && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500">Driver:</span>
                                                    <span className="text-gray-900">{trip.driver}</span>
                                                </div>
                                            )}
                                            <div className="text-xs text-gray-400 mt-2">
                                                {trip.created_at}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No rides yet.</p>
                        <Link
                            href="/ride/request"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                        >
                            Request Your First Ride
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

