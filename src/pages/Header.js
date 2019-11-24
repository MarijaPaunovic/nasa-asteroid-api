import React from 'react';

const Header = () => (
    <header style={headerStyle}>
        <h1>Asteroids - NeoWs</h1>
        <h3>NeoWs (Near Earth Object Web Service) is a RESTful web service for near earth Asteroid information</h3>
    </header>
)

const headerStyle = {
    background: '#105bd8',
    color: '#fff',
    textAlign: 'center',
    padding: '5vh'
}

export default Header;