export default function ProductsLoading() {
    return (
        <div className="space-y-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                <div className="relative flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <div className="space-y-6">
                    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 space-y-4">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                        <div className="space-y-2">
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                                <div className="aspect-h-1 aspect-w-1 w-full rounded-xl bg-gray-200 animate-pulse h-44"></div>
                                <div className="mt-4 flex flex-col flex-grow space-y-3">
                                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                                </div>
                                <div className="mt-4 h-10 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
