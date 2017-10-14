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
    const w = svg.scrollWidth;
    const h = svg.scrollHeight;
    const MARGIN = 10;
    const aw = w - 2 * MARGIN;
    const ah = h - 2 * MARGIN;
    [1, 2, 3].forEach(i => {
        const y = MARGIN + ah * i / 4;
        const line = createElement('line', {
            x1: MARGIN,
            y1: y,
            x2: w - 1 - MARGIN,
            y2: y,
            stroke: 'grey',
            'stroke-width': 1,
            'stroke-dasharray': [1, 4]
        });
        svg.appendChild(line);
    });
    [1, 2, 3, 4, 5, 6, 7].forEach(i => {
        const x = MARGIN + aw * i / 8;
        const line = createElement('line', {
            x1: x,
            y1: MARGIN,
            x2: x,
            y2: h - 1 - MARGIN,
            stroke: 'grey',
            'stroke-width': 1,
            'stroke-dasharray': [1, 4]
        });
        svg.appendChild(line);
    });
    const SQUARE_SIZE = aw / 128;
    const MIN_VALUE = Math.min(...values);
    const MAX_VALUE = Math.max(...values);
    const MAX = Math.max(Math.abs(MIN_VALUE), Math.abs(MAX_VALUE));
    const RANGE = 4 * MAX || 64;
    const MID_VALUE = 0;
    const MID_Y = h / 2;
    const STEP = ah / RANGE;
    values.forEach((value, index) => {
        const x = MARGIN + aw / values.length * index - (SQUARE_SIZE / 2);
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
