export default function CartLoading() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="h-10 bg-gray-200 rounded animate-pulse w-64"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                            <div className="h-20 w-20 rounded-xl bg-gray-200 animate-pulse shrink-0"></div>
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                            </div>
                            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                        <div className="h-7 bg-gray-200 rounded animate-pulse w-32 border-b border-gray-100 pb-3"></div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                            </div>
                            <div className="flex justify-between">
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4 flex justify-between">
                            <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-28"></div>
                        </div>
                        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
