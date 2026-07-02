import React from 'react';

function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-center text-xs leading-5 text-gray-500">
                    &copy; 2026 RETUR Market - Tüm Hakları Saklıdır. MultiAcademy React Foundations Bootcamp Mezuniyet Projesi.
                </p>
            </div>
        </footer>
    );
}

export default React.memo(Footer);