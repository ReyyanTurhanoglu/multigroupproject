export default function CheckoutLoading() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded animate-pulse w-80"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-96"></div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                        <div className="h-7 bg-gray-200 rounded animate-pulse w-48 border-b border-gray-50 pb-2"></div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
                                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                        <div className="h-7 bg-gray-200 rounded animate-pulse w-40 border-b border-gray-50 pb-2"></div>
                        <div className="space-y-2">
                            <div className="h-5 bg-gray-200 rounded animate-pulse w-28"></div>
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-14 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4 sticky top-24">
                        <div className="h-7 bg-gray-200 rounded animate-pulse w-48 border-b border-gray-100 pb-3"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center pt-3">
                                    <div className="min-w-0 flex-1 space-y-2">
                                        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                                    </div>
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-16 ml-4"></div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            <div className="flex justify-between">
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                            </div>
                            <div className="flex justify-between">
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
                            </div>
                            <div className="flex justify-between border-t border-gray-100 pt-2">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-28"></div>
                                <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
