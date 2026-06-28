import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Gallery from './pages/Gallery';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="min-h-screen">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/welcome"
                            element={
                                <ProtectedRoute>
                                    <Welcome />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/upload"
                            element={
                                <ProtectedRoute>
                                    <Upload />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/gallery"
                            element={
                                <ProtectedRoute>
                                    <Gallery />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
