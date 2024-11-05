import React, { useState, useEffect } from 'react';
import { getActivityLog } from '../../services/api';
import './ActivityLog.css';

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getActivityLog();
                setLogs(response.data);
            } catch (error) {
                setError('Failed to fetch activity logs');
                console.error('Error fetching activity logs', error);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="activity-log-container">
            {error && <p>{error}</p>}
            <table className="activity-log-table">
                <thead>
                <tr>
                    <th>User</th>
                    <th>Video</th>
                    <th>Action</th>
                    <th>Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log) => (
                    <tr key={log.id}>
                        <td>{log.username}</td>
                        <td>{log.videoTitle}</td>
                        <td>{log.action}</td>
                        <td>{log.timestamp}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityLog;