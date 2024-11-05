import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVideos, assignVideo, getAllUsers } from '../../services/api';

const AssignVideos = () => {
    const [videos, setVideos] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideosAndUsers = async () => {
            try {
                const videosResponse = await getAllVideos();
                const usersResponse = await getAllUsers();
                setVideos(videosResponse.data);
                setUsers(usersResponse.data);
            } catch (error) {
                setError('Failed to fetch videos or users.');
            }
        };
        fetchVideosAndUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await assignVideo(selectedVideo, selectedUser);
            alert('Video assigned successfully');
            navigate('/assigned-videos-admin');
        } catch (error) {
            console.error('Assignment failed', error);
            setError('Failed to assign video. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div>
                <label>User:</label>
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Video:</label>
                <select value={selectedVideo} onChange={(e) => setSelectedVideo(e.target.value)}>
                    <option value="">Select a video</option>
                    {videos.map((video) => (
                        <option key={video.id} value={video.id}>
                            {video.title}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Assign</button>
        </form>
    );
};

export default AssignVideos;