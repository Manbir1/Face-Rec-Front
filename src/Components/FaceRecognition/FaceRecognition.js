import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt-2'>
                <img id='inputImg' alt = 'Face' src={imageUrl} width='500px' height='auto'/>
                <div className='boundingBox' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition

// 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/431px-Tom_Hanks_TIFF_2019.jpg'