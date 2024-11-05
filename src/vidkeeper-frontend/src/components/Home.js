import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
    if (!user) {
        return <div>Please log in to access this page.</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <nav>
                <ul>
                    {user.role === 'ADMIN' && (
                        <>
                            <li><Link to="/upload-video">Upload Video</Link></li>
                            <li><Link to="/assign-videos">Assign Videos</Link></li>
                            <li><Link to="/activity-log">Activity Log</Link></li>
                            <li><Link to="/videos">All Videos</Link></li>
                        </>
                    )}
                    {user.role === 'USER' && (
                        <>
                            <li><Link to="/assigned-videos">Assigned Videos</Link></li>

                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Home;