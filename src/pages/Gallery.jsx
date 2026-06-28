import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Gallery = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await api.get('/api/files');
            if (response.data.success) {
                setFiles(response.data.files);
            }
        } catch (err) {
            setError('Failed to load files');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fileId) => {
        if (!window.confirm('Are you sure you want to delete this file?')) {
            return;
        }

        try {
            await api.delete(`/api/files/${fileId}`);
            setFiles(files.filter(file => file.id !== fileId));
        } catch (err) {
            setError('Failed to delete file');
        }
    };

    const renderFile = (file) => {
        if (file.file_type.startsWith('image/')) {
            return (
                <img
                    src={file.cloudinary_url}
                    alt={file.original_name}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            );
        } else if (file.file_type.startsWith('video/')) {
            return (
                <video
                    src={file.cloudinary_url}
                    controls
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        My Files
                    </h2>
                    <button
                        onClick={() => navigate('/upload')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Upload New File
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {files.length === 0 ? (
                    <div className="bg-white shadow rounded-lg p-8 text-center">
                        <p className="text-gray-500 text-lg">No files uploaded yet</p>
                        <button
                            onClick={() => navigate('/upload')}
                            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                        >
                            Upload Your First File
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {files.map((file) => (
                            <div key={file.id} className="bg-white shadow rounded-lg overflow-hidden">
                                {renderFile(file)}
                                <div className="p-4">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {file.original_name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {(file.file_size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(file.created_at).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(file.id)}
                                        className="mt-3 w-full bg-red-50 text-red-600 px-3 py-2 rounded-md text-sm hover:bg-red-100"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
