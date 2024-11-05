import React, { useState, useEffect } from 'react';
import { getAllAssignedVideos } from '../../services/api';

const AssignedVideosAdmin = () => {
    const [assignedVideos, setAssignedVideos] = useState([]);

    useEffect(() => {
        const fetchAssignedVideos = async () => {
            try {
                const videos = await getAllAssignedVideos();
                setAssignedVideos(videos.data);
            } catch (error) {
                console.error('Failed to fetch assigned videos', error);
            }
        };

        fetchAssignedVideos();
    }, []);

    return (
        <div>
            <h2>All Assigned Videos</h2>
            <div>
                {assignedVideos.map((video, index) => (
                    <div style={{ marginBottom: '8px' }} key={`${video.videoName}-${index}`}>
                        <strong>Video:</strong> {video.videoName} <br />
                        <strong>Assigned to:</strong> {video.userName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignedVideosAdmin;
