import React from 'react';
import PropTypes from 'prop-types';
import { drawDiagram } from '../../diagram';

const Diagram = ({ dataPoints, joinPoints, range, caption }) => {
    return (
        <figure>
            <svg ref={svg => svg && drawDiagram(svg, dataPoints, joinPoints, range)} />
            <figcaption>{caption}</figcaption>
        </figure>
    );
};

Diagram.defaultProps = {
    joinPoints: false,
    range: null
};

Diagram.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    joinPoints: PropTypes.bool,
    range: PropTypes.object,
    caption: PropTypes.string.isRequired
};

export default Diagram;
