/* eslint-env browser */

const MARGIN = 30;

const createElement = (elementName, additionalAttributes) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
    if (additionalAttributes) {
        Object.keys(additionalAttributes).forEach(k =>
            element.setAttribute(k, additionalAttributes[k]));
    }
    return element;
};

export const drawDiagram = (svg, values) => {

    clear(svg);

    const w = svg.scrollWidth;
    const h = svg.scrollHeight;
    const aw = w - 2 * MARGIN;
    const ah = h - 2 * MARGIN;
    const dimensions = { w, h, aw, ah };

    drawInnerHorizontalGridLines(dimensions, svg);
    drawInnerVerticalGridLines(dimensions, svg);
    drawOuterRect(dimensions, svg);
    drawHorizontalDivisionLines(dimensions, svg);
    drawVerticalDivisionLines(dimensions, svg);
    drawValues(dimensions, svg, values);
};

const clear = svg => {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
};

const drawInnerHorizontalGridLines = (d, svg) => {
    [1, 2, 3].forEach(i => {
        const y = MARGIN + d.ah * i / 4;
        const line = createElement('line', {
            x1: MARGIN,
            y1: y,
            x2: d.w - 1 - MARGIN,
            y2: y,
            'class': 'diagram-inner-grid-line'
        });
        svg.appendChild(line);
    });
};

const drawInnerVerticalGridLines = (d, svg) => {
    [1, 2, 3, 4, 5, 6, 7].forEach(i => {
        const x = MARGIN + d.aw * i / 8;
        const line = createElement('line', {
            x1: x,
            y1: MARGIN,
            x2: x,
            y2: d.h - 1 - MARGIN,
            'class': 'diagram-inner-grid-line'
        });
        svg.appendChild(line);
    });
};

const drawOuterRect = (d, svg) => {
    const rect = createElement('rect', {
        x: MARGIN,
        y: MARGIN,
        width: d.aw,
        height: d.ah,
        'class': 'diagram-outer-rect'
    });
    svg.appendChild(rect);
};

const drawHorizontalDivisionLines = (d, svg) => {
    [0, 1, 2, 3, 4].forEach(i => {
        const y = MARGIN + d.ah * i / 4;
        const line = createElement('line', {
            x1: MARGIN / 2,
            y1: y,
            x2: MARGIN,
            y2: y,
            'class': 'diagram-division-line'
        });
        svg.appendChild(line);
    });
};

const drawVerticalDivisionLines = (d, svg) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(i => {
        const x = MARGIN + d.aw * i / 8;
        const line = createElement('line', {
            x1: x,
            y1: d.h - 1 - MARGIN,
            x2: x,
            y2: d.h - 1 - (MARGIN / 2),
            'class': 'diagram-division-line'
        });
        svg.appendChild(line);
    });
};

const drawValues = (d, svg, values) => {

    const SQUARE_SIZE = d.aw / 128;
    const MIN_VALUE = Math.min(...values);
    const MAX_VALUE = Math.max(...values);
    const MAX = Math.ceil(Math.max(Math.abs(MIN_VALUE), Math.abs(MAX_VALUE)));
    const RANGE = 4 * MAX || 64;
    const MID_VALUE = 0;
    const MID_Y = d.h / 2;
    const STEP = d.ah / RANGE;

    const isMultipleOf8 = values.length % 8 === 0;
    const numDivisions = isMultipleOf8 ? values.length : values.length - 1;

    values.forEach((value, index) => {
        const x = MARGIN + d.aw / numDivisions * index - (SQUARE_SIZE / 2);
        const dy = (value - MID_VALUE) * STEP;
        const y = MID_Y - dy - (SQUARE_SIZE / 2);
        const rect = createElement('rect', {
            x,
            y,
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
            'class': 'diagram-value'
        });
        svg.appendChild(rect);
    });

    drawHorizontalAxisLabels(d, svg, values);
    drawVerticalAxisLabels(d, svg, values, RANGE, STEP);
};

const drawHorizontalAxisLabels = (d, svg, values) => {
    const EIGHTH = Math.floor(values.length / 8);
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(i => {
        const x = MARGIN + d.aw * i / 8;
        const text = createElement('text', {
            x,
            y: d.h - 2,
            class: 'diagram-horizontal-axis-labels'
        });
        const label = EIGHTH * i;
        text.appendChild(document.createTextNode(label));
        svg.appendChild(text);
    });
};

const drawVerticalAxisLabels = (d, svg, values, RANGE, STEP) => {
    [0, 1, 2, 3, 4].forEach(i => {
        const y = MARGIN + RANGE * STEP * i / 4;
        const text = createElement('text', {
            x: 2,
            y: y,
            class: 'diagram-vertical-axis-labels'
        });
        const v1 = 2 - i;
        const label = RANGE / 4 * v1;
        text.appendChild(document.createTextNode(label));
        svg.appendChild(text);
    });
};
