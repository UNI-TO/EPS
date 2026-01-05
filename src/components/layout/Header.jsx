import React from 'react';
import { Home } from 'lucide-react';

const Header = ({ onBackToHome }) => {
    return (
        <div className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <button
                    onClick={onBackToHome}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
                >
                    <Home className="w-5 h-5" />
                    Torna alla Home
                </button>
            </div>
        </div>
    );
};

export default Header;
