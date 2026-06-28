import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError('');
            
            // Create preview for images
            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                setPreview(null);
            }
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setError('');

        try {
            const response = await api.post('/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                navigate('/gallery');
            } else {
                setError('Upload failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow rounded-lg p-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                        Upload File
                    </h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleUpload}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select File (Image or Video, max 10MB)
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*,video/*"
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
                            />
                        </div>

                        {file && (
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-2">
                                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                                {preview && (
                                    <div className="mt-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="max-w-full h-auto rounded-lg shadow-md"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!file || uploading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Uploading...
                                </div>
                            ) : (
                                'Upload'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Upload;
