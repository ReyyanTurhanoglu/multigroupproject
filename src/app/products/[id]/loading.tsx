export default function ProductDetailLoading() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse"></div>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
                        <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse w-48"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                    <div className="pt-6 border-t border-gray-200">
                        <div className="h-14 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                            <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
