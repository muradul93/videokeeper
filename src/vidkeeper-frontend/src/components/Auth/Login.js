// src/vidkeeper-frontend/src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import styled from 'styled-components';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            const { token } = response.data;
            localStorage.setItem('token', token); // Store the token in localStorage
            onLogin(response.data);
            navigate('/home'); // Redirect to home after login
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
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
                <ButtonContainer>
                    <button type="submit">Login</button>
                    <SignupButton onClick={handleSignupRedirect}>Signup</SignupButton>
                </ButtonContainer>
            </form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    width: 300px; /* Adjust the width as needed */
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px; /* Add margin to separate the buttons */
`;

const SignupButton = styled.button`
    margin-left: 10px; /* Add margin to separate the buttons */
`;

export default Login;