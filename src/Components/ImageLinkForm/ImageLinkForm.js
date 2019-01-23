import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonDetect}) => {
    return (
        <div className='pa4 br3 shadow-5 w-90 center form'>
            <p className='f3 b navy'>
                This magic brain will detect faces in your pictures. Give it a try, feed him a link !
            </p>
            <div className='center'>
                <input 
                    className='f4 pa2 w-60 center' 
                    type='text'
                    onChange={onInputChange} />
                <div 
                    className='br2 button w-30 grow f4 link ph3 pv2 dib white bg-navy'
                    onClick={onButtonDetect} >
                    Detect !
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;