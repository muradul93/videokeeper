// src/vidkeeper-frontend/src/components/Layout.js
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Layout = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Container>
            <TopPanel>
                <h1>VidKeeper</h1>
                <Nav>
                    <NavItem><Link to="/home">Home</Link></NavItem>
                    {user ? (
                        <>
                            {user.role === 'ADMIN' && (
                                <>
                                    <NavItem><Link to="/upload-video">Upload Video</Link></NavItem>
                                    <NavItem><Link to="/videos">All Videos</Link></NavItem>
                                    <NavItem><Link to="/activity-log">Activity Log</Link></NavItem>
                                    <NavItem><Link to="/assign-videos">Assign Video to User</Link></NavItem>
                                    <NavItem><Link to="/assign-videos-admin">Assigned Videos</Link></NavItem>
                                </>
                            )}
                            {user.role === 'USER' && (
                                <>
                                    <NavItem><Link to="/assigned-videos">Assigned Videos</Link></NavItem>
                                </>
                            )}
                            <NavItem><button onClick={handleLogout}>Logout</button></NavItem>
                        </>
                    ) : (
                        <>
                            <NavItem><Link to="/login">Login</Link></NavItem>
                            <NavItem><Link to="/signup">Signup</Link></NavItem>
                        </>
                    )}
                </Nav>
            </TopPanel>
            <MainContent>
                <Outlet />
            </MainContent>
        </Container>
    );
};

export const TopPanel = styled.div`
    width: 100%;
    height: 60px;
    background-color: #333;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 20px;
    z-index: 1000;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Nav = styled.ul`
    display: flex;
    list-style: none;
    margin-left: 20px;
`;

const NavItem = styled.li`
    margin: 0 10px;
    a {
        color: white;
        text-decoration: none;
    }
`;

const MainContent = styled.div`
    flex: 1;
    padding: 20px;
    margin-top: 60px;
`;

export default Layout;