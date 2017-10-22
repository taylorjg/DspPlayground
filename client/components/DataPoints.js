import React from 'react';
import PropTypes from 'prop-types';

const DataPoints = ({ dataPoints }) => {
    return (
        <pre>{ JSON.stringify(dataPoints) }</pre>
    );
};

DataPoints.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default DataPoints;
