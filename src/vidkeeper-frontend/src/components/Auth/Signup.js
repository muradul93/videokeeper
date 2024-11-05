// src/vidkeeper-frontend/src/components/Auth/Signup.js
import React, { useState } from 'react';
import { signup } from '../../services/api';
import styled from 'styled-components';
import { TopPanel } from '../Layout'; // Import TopPanel

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Default role

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(username, password, role);
            onSignup(response.data);
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <div>
            <TopPanel>
                <h1>VidKeeper</h1>
            </TopPanel>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </FormContainer>
        </div>
    );
};

const FormContainer = styled.div`
    width: 300px; /* Adjust the width as needed */
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
`;

export default Signup;