/* eslint-env browser */

const createElement = (elementName, additionalAttributes) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
    if (additionalAttributes) {
        Object.keys(additionalAttributes).forEach(k =>
            element.setAttribute(k, additionalAttributes[k]));
    }
    return element;
};

export const drawDiagram = (id, values, title) => {

    const svg = document.getElementById(id);
    const caption = document.getElementById(`${id}-caption`);
    caption.innerHTML = title;

    const MARGIN = 20;
    const w = svg.scrollWidth;
    const h = svg.scrollHeight;
    const aw = w - 2 * MARGIN;
    const ah = h - 2 * MARGIN;

    drawInnerHorizontalGridLines(w, h, aw, ah, MARGIN, svg);
    drawInnerVerticalGridLines(w, h, aw, ah, MARGIN, svg);
    drawOuterHorizontalGridLines(w, h, aw, ah, MARGIN, svg);
    drawOuterVerticalGridLines(w, h, aw, ah, MARGIN, svg);
    drawValues(w, h, aw, ah, MARGIN, svg, values);
};

const drawValues = (w, h, aw, ah, margin, svg,values) => {

    const SQUARE_SIZE = aw / 128;
    const MIN_VALUE = Math.min(...values);
    const MAX_VALUE = Math.max(...values);
    const MAX = Math.max(Math.abs(MIN_VALUE), Math.abs(MAX_VALUE));
    const RANGE = 4 * MAX || 64;
    const MID_VALUE = 0;
    const MID_Y = h / 2;
    const STEP = ah / RANGE;
    
    values.forEach((value, index) => {
        const x = margin + aw / values.length * index - (SQUARE_SIZE / 2);
        const dy = (value - MID_VALUE) * STEP;
        const y = MID_Y - dy - (SQUARE_SIZE / 2);
        const rect = createElement('rect', {
            x,
            y,
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
            fill: 'black'
        });
        svg.appendChild(rect);
    });
};

const drawInnerHorizontalGridLines = (w, h, aw, ah, margin, svg) => {
    [1, 2, 3].forEach(i => {
        const y = margin + ah * i / 4;
        const line = createElement('line', {
            x1: margin,
            y1: y,
            x2: w - 1 - margin,
            y2: y,
            stroke: 'grey',
            'stroke-width': 1,
            'stroke-dasharray': [4, 4]
        });
        svg.appendChild(line);
    });
};

const drawInnerVerticalGridLines = (w, h, aw, ah, margin, svg) => {
    [1, 2, 3, 4, 5, 6, 7].forEach(i => {
        const x = margin + aw * i / 8;
        const line = createElement('line', {
            x1: x,
            y1: margin,
            x2: x,
            y2: h - 1 - margin,
            stroke: 'grey',
            'stroke-width': 1,
            'stroke-dasharray': [4, 4]
        });
        svg.appendChild(line);
    });
};

const drawOuterHorizontalGridLines = (w, h, aw, ah, margin, svg) => {

    const rect = createElement('rect', {
        x: margin,
        y: margin,
        width: aw,
        height: ah,
        stroke: 'grey',
        'stroke-width': 1,
        'fill-opacity': 0
    });
    svg.appendChild(rect);

    [0, 1, 2, 3, 4].forEach(i => {
        const y = margin + ah * i / 4;
        const line = createElement('line', {
            x1: margin / 2,
            y1: y,
            x2: margin,
            y2: y,
            stroke: 'grey',
            'stroke-width': 1
        });
        svg.appendChild(line);
    });
};

const drawOuterVerticalGridLines = (w, h, aw, ah, margin, svg) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(i => {
        const x = margin + aw * i / 8;
        const line = createElement('line', {
            x1: x,
            y1: h - 1 - margin,
            x2: x,
            y2: h - 1 - (margin / 2),
            stroke: 'grey',
            'stroke-width': 1
        });
        svg.appendChild(line);
    });
};
