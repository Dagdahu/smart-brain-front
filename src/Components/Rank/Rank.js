import React from 'react';

const Rank = ({username, entries}) => {
    return (
        <div className='white'>
            <div className='f2'>
                Hello {username} !
            </div>
            <div className='f3'>
                You have done {entries} submissions so far.
            </div>
        </div>
    );
}

export default Rank;