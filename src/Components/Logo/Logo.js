import React from 'react';
import Tilt from 'react-tilt';
import brainPNG from './brain.png';

const Logo = () => {
    return (
        <div className='ma3 absolute'>
            <Tilt className="Tilt" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={brainPNG} alt='Brain logo'/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;