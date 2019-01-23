import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imgSrc, box}) => {
    return (
        <div className='image-wrapper center ma3 w-70'>
            <img
                className='center w-100'
                id='inputImage'
                src={imgSrc} 
                alt=''/>
            <div 
                className='bounding-box'
                style={{
                    top: box.topRow + '%',
                    bottom: box.bottomRow + '%',
                    right: box.rightCol + '%',
                    left: box.leftCol + '%'
                }} 
            >
            </div>
        </div>
    );
}

export default FaceRecognition;