import React from 'react';
import PropTypes from 'prop-types';
import { drawDiagram } from '../../diagram';

const Diagram = ({ dataPoints, joinPoints, caption }) => {
    return (
        <figure>
            <svg ref={svg => svg && drawDiagram(svg, dataPoints, joinPoints)} />
            <figcaption>{caption}</figcaption>
        </figure>
    );
};

Diagram.defaultProps = {
    joinPoints: false,
};

Diagram.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    joinPoints: PropTypes.bool,
    caption: PropTypes.string.isRequired
};

export default Diagram;
