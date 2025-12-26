import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Map, FileText, Mic, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Roadmap', path: '/skills', icon: Map },
        { name: 'Resume', path: '/resume', icon: FileText },
        { name: 'Practice', path: '/interview', icon: Mic },
    ];

    const handleLogout = () => {
        // Simple redirection for simulation
        navigate('/');
    };

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-1 z-50 border border-white/20 w-[95%] max-w-fit">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `p-3 md:px-5 md:py-3 rounded-2xl transition-all duration-500 flex items-center gap-3 group ${isActive
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110'
                            : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                        }`
                    }
                >
                    <item.icon size={22} className="shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-bold hidden md:block tracking-wide">{item.name}</span>
                </NavLink>
            ))}
            <div className="w-px h-8 bg-gray-200/50 mx-2 hidden md:block" />
            <button
                onClick={handleLogout}
                className="p-3 md:px-5 md:py-3 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 group flex items-center gap-3"
                title="Logout"
            >
                <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-sm font-bold hidden md:block tracking-wide">Logout</span>
            </button>
        </nav>
    );
};

export default Navbar;
