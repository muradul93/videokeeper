import React, { useState, useEffect } from 'react';
import { getAllVideos, deleteVideo, updateVideo } from '../../services/api';

const VideoManagement = () => {
    const [videos, setVideos] = useState([]);
    const [editingVideo, setEditingVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await getAllVideos();
            setVideos(response.data);
        };
        fetchVideos();
    }, []);

    const handleDelete = async (videoId) => {
        try {
            await deleteVideo(videoId);
            setVideos(videos.filter((video) => video.id !== videoId));
        } catch (error) {
            console.error('Delete failed', error);
        }
    };

    const handleEdit = (video) => {
        setEditingVideo(video);
        setTitle(video.title);
        setDescription(video.description);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateVideo(editingVideo.id, title, description, file);
            setEditingVideo(null);
            setTitle('');
            setDescription('');
            setFile(null);
            const response = await getAllVideos();
            setVideos(response.data);
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    return (
        <div>
            <h2>Video Management</h2>
            <ul>
                {videos.map((video) => (
                    <li key={video.id}>
                        {video.title}
                        <button onClick={() => handleEdit(video)}>Edit</button>
                        <button onClick={() => handleDelete(video.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editingVideo && (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label>File:</label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
};

export default VideoManagement;