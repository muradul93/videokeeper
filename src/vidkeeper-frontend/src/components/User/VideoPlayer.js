import React, { useEffect, useRef } from 'react';
import { logActivity } from '../../services/api';

const VideoPlayer = ({ videoUrl, videoId, username }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const logUserActivity = async ({ username, videoId, action }) => {
            try {
                await logActivity(username, videoId, action);
            } catch (error) {
                console.error('Error logging activity', error);
            }
        };

        const intervalId = setInterval(() => {
            logUserActivity({ username, videoId, action: 'VIEWED' });
        }, 20000);

        return () => {
            clearInterval(intervalId);
        };
    }, [videoId, username]);

    return (
        <div>
            <video ref={videoRef} width="600" controls>
                <source src={videoUrl} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;