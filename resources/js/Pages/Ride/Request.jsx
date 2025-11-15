import { Head, useForm, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RequestRide({ activeFare }) {
    const { data, setData, post, processing, errors } = useForm({
        pickup: '',
        dropoff: '',
        distance_km: '',
        estimated_duration_minutes: '',
    });

    const [fareEstimate, setFareEstimate] = useState(null);
    const [isEstimating, setIsEstimating] = useState(false);

    const estimateFare = async () => {
        if (!data.pickup || !data.dropoff) {
            setFareEstimate(null);
            return;
        }

        // If distance is provided, calculate fare
        if (data.distance_km || data.estimated_duration_minutes) {
            setIsEstimating(true);
            try {
                const response = await axios.post('/ride/estimate', {
                    distance_km: data.distance_km || 0,
                    estimated_duration_minutes: data.estimated_duration_minutes || 0,
                });
                setFareEstimate(response.data);
            } catch (error) {
                console.error('Error estimating fare:', error);
            } finally {
                setIsEstimating(false);
            }
        } else if (activeFare) {
            // Show minimum fare if no distance provided
            setFareEstimate({
                fare: activeFare.minimum_fare.toFixed(2),
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            estimateFare();
        }, 500);

        return () => clearTimeout(timer);
    }, [data.distance_km, data.estimated_duration_minutes, data.pickup, data.dropoff]);

    const submit = (e) => {
        e.preventDefault();
        post('/ride/request', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Request Ride">
            <Head title="Request Ride" />
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Location
                    </label>
                    <input
                        type="text"
                        value={data.pickup}
                        onChange={(e) => setData('pickup', e.target.value)}
                        placeholder="Enter pickup address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    {errors.pickup && (
                        <p className="text-red-500 text-sm mt-1">{errors.pickup}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Drop-off Location
                    </label>
                    <input
                        type="text"
                        value={data.dropoff}
                        onChange={(e) => setData('dropoff', e.target.value)}
                        placeholder="Enter drop-off address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    {errors.dropoff && (
                        <p className="text-red-500 text-sm mt-1">{errors.dropoff}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Distance (km) <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={data.distance_km}
                            onChange={(e) => setData('distance_km', e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.distance_km && (
                            <p className="text-red-500 text-sm mt-1">{errors.distance_km}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Duration (minutes) <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={data.estimated_duration_minutes}
                            onChange={(e) => setData('estimated_duration_minutes', e.target.value)}
                            placeholder="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.estimated_duration_minutes && (
                            <p className="text-red-500 text-sm mt-1">{errors.estimated_duration_minutes}</p>
                        )}
                    </div>
                </div>

                {/* Fare Estimate Display */}
                {fareEstimate && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Estimated Fare</p>
                                <p className="text-2xl font-bold text-blue-600 mt-1">
                                    ₱{fareEstimate.fare}
                                </p>
                            </div>
                            {isEstimating && (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            )}
                        </div>
                        {fareEstimate.breakdown && (
                            <div className="mt-3 pt-3 border-t border-blue-200 text-xs text-gray-600 space-y-1">
                                <div className="flex justify-between">
                                    <span>Base fare:</span>
                                    <span>₱{parseFloat(fareEstimate.breakdown.base_fare).toFixed(2)}</span>
                                </div>
                                {fareEstimate.breakdown.distance_charge > 0 && (
                                    <div className="flex justify-between">
                                        <span>Distance charge:</span>
                                        <span>₱{parseFloat(fareEstimate.breakdown.distance_charge).toFixed(2)}</span>
                                    </div>
                                )}
                                {fareEstimate.breakdown.time_charge > 0 && (
                                    <div className="flex justify-between">
                                        <span>Time charge:</span>
                                        <span>₱{parseFloat(fareEstimate.breakdown.time_charge).toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {!activeFare && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                            No active fare configuration found. Please contact support.
                        </p>
                    </div>
                )}

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={processing || !activeFare}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                        {processing ? 'Requesting...' : 'Request Ride'}
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors inline-block text-center"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}

