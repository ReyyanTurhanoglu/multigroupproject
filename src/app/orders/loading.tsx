export default function OrdersLoading() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded animate-pulse w-64"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-96"></div>
            </div>
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
                        <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-28"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                                    <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                                </div>
                            </div>
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                        </div>
                        <div className="px-6 py-4 space-y-4">
                            {[1, 2].map((j) => (
                                <div key={j} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                                    <div className="min-w-0 space-y-2">
                                        <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                                    </div>
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-20 ml-4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
