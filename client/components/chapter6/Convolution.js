import React from 'react';

const Convolution = route => {
    const id = route.match.params.id;
    return (
        <div>Convolution demo (id: {id})</div>
    );
};

export default Convolution;
