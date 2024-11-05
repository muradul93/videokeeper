// src/vidkeeper-frontend/src/App.js
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { getUserData } from './services/api';

const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const UploadVideo = lazy(() => import('./components/Admin/UploadVideo'));
const AssignVideos = lazy(() => import('./components/Admin/AssignVideos'));
const ActivityLog = lazy(() => import('./components/Admin/ActivityLog'));
const VideoManagement = lazy(() => import('./components/Admin/VideoManagement'));
const AssignedVideos = lazy(() => import('./components/User/AssignedVideos'));
const VideoPlayer = lazy(() => import('./components/User/VideoPlayer'));
const Home = lazy(() => import('./components/Home'));
const AllVideos = lazy(() => import('./components/Admin/AllVideos'));
const AssignedVideosAdmin = lazy(() => import('./components/Admin/AssignedVideosAdmin'));

const AppRoutes = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        localStorage.setItem('token', userData.token); // Store token with user data
        setUser(userData);
        navigate('/home');
    };


    const handleSignup = () => {
        navigate('/login');
    };

    useEffect(() => {
        const checkTokenAndFetchUser = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            // If user data exists in localStorage, set it directly
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                return;
            }

            // If token is available but user data is missing, attempt to fetch user data
            if (token) {
                try {
                    const userData = await getUserData(token);
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user data', error);
                    localStorage.removeItem('token'); // Clear token if fetching user data fails
                    localStorage.removeItem('user'); // Clear any partial user data
                    setUser(null);
                    navigate('/login');
                }
            } else {
                // No token; allow access to signup page
                localStorage.removeItem('user');
                setUser(null);
                if (window.location.pathname !== '/signup') {
                    navigate('/login');
                }
            }
        };

        checkTokenAndFetchUser();
    }, [setUser, navigate]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
                <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup onSignup={handleSignup} />} />
                {/*<Route path="signup" element={<Signup />} />*/}
                <Route path="/" element={<Layout user={user} />}>
                    <Route path="home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                    {user && user.role === 'ADMIN' && (
                        <>
                            <Route path="upload-video" element={<UploadVideo />} />
                            <Route path="assign-videos" element={<AssignVideos />} />
                            <Route path="activity-log" element={<ActivityLog />} />
                            <Route path="video-management" element={<VideoManagement />} />
                            <Route path="videos" element={<AllVideos />} />
                            <Route path="assigned-videos-admin" element={<AssignedVideosAdmin />} />
                        </>
                    )}
                    {user && user.role === 'USER' && (
                        <>
                            <Route path="assigned-videos" element={<AssignedVideos userId={user.id} />} />
                            <Route path="video-player" element={<VideoPlayer username={user.username} />} />
                        </>
                    )}
                </Route>
                <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
            </Routes>
        </Suspense>
    );
};

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Router>
            <AppRoutes user={user} setUser={setUser} />
        </Router>
    );
};

export default App;