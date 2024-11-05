import axios from 'axios';

const api = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshToken();
                localStorage.setItem('token', newToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const refreshToken = async () => {
    try {
        const response = await api.post('/api/auth/login');
        const { token } = response.data;
        return token;
    } catch (error) {
        console.error('Token refresh failed', error);
        throw error;
    }
};

export const signup = (username, password, role) => {
    localStorage.clear();
    return api.post('/api/auth/signup', { username, password, role });
};

export const login = (username, password) => {
    // localStorage.clear();
    return api.post('/api/auth/login', { username, password });
};

export const getUserData = async (token) => {
    try {
        const response = await api.get('/api/auth/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user data', error);
        throw error;
    }
};

export const logActivity = async (username, videoId, action) => {
    return api.post('/activity-log', {
        username,
        videoId,
        action
    });
};

export const uploadVideo = (title, description, file) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    return api.post('/videos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const assignVideo = async (videoId, userId) => {
    try {
        const response = await api.post(`/videos/${videoId}/assign`, { id: userId });
        return response.data;
    } catch (error) {
        console.error('Failed to assign video', error);
        throw error;
    }
};

export const getActivityLog = () => {
    return api.get('/activity-log');
};

export const getAllVideos = () => {
    return api.get('/videos');
};

export const getAssignedVideos = (username) => {
    return api.get(`videos/users/${username}`);
};

export const deleteVideo = (videoId) => {
    return api.delete(`/videos/${videoId}`);
};

export const getAllUsers = () => {
    return api.get('/users');
};

export const getAllAssignedVideos = () => {
    return api.get('/videos/all-assigned-videos');
};

export const updateVideo = (videoId, title, description, file) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    return api.put(`/videos/${videoId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};