import React from 'react';
import PropTypes from 'prop-types';
import { drawDiagram } from '../../diagram';

const Diagram = ({ dataPoints, caption }) => {
    return (
        <figure>
            <svg ref={drawDiagram(dataPoints)} />
            <figcaption>{caption}</figcaption>
        </figure>
    );
};

Diagram.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    caption: PropTypes.string.isRequired
};

export default Diagram;
