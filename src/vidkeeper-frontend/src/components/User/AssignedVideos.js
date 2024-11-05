import React, { useState, useEffect } from 'react';
import { getAssignedVideos } from '../../services/api';
import VideoPlayer from '../User/VideoPlayer';

const AssignedVideos = () => {
    const [videos, setVideos] = useState([]);
    const [username, setUsername] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                const username = storedUser.username;
                const response = await getAssignedVideos(username);
                setVideos(response.data);
                setUsername(username);
            } catch (error) {
                console.error('Error fetching assigned videos', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div>
            <h2>Assigned Videos</h2>
            <ul>
                {videos.map((video) => (
                    <li key={video.id} className="video-container">
                        <div className="video-player">
                            <VideoPlayer videoUrl={video.videoUrl} videoId={video.id} username={username} />
                        </div>
                        <h3 className="video-title">{video.title}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignedVideos;