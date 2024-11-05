import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from '../User/VideoPlayer';
import './AllVideos.css';

const AllVideos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
                const response = await axios.get('/videos', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div>
            <h2>All Videos</h2>
            <ul>
                {videos.map((video) => (
                    <li key={video.id} className="video-container">
                        <div className="video-player">
                            <VideoPlayer videoUrl={video.videoUrl} videoId={video.id} username={video.username} />
                        </div>
                        <h3 className="video-title">{video.title}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllVideos;