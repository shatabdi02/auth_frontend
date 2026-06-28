import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-white text-xl font-bold">
                            Auth App
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-white">
                                    Welcome, {user?.name}
                                </span>
                                <Link
                                    to="/profile"
                                    className="text-white hover:text-indigo-200 transition"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white hover:text-indigo-200 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
