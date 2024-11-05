import React, { useState } from 'react';
import { uploadVideo } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await uploadVideo(title, description, file);
            alert('Video uploaded successfully');
            navigate('/videos');
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadVideo;