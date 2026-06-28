import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Welcome = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Welcome, {user?.name}!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            You have successfully logged in to your account.
                        </p>
                        
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                Your Account Information
                            </h2>
                            <div className="text-left space-y-2">
                                <p className="text-gray-700">
                                    <span className="font-medium">Name:</span> {user?.name}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Email:</span> {user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <Link
                                to="/profile"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
