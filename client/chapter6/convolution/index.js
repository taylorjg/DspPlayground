import { queryStringToMap } from '../../utils';
import { convolve } from '../../../dsp';
import { createLowPassFilterKernel } from '../../../dsp';
import { createHighPassFilterKernel } from '../../../dsp';
import { drawDiagram } from '../../../diagram';
import sineWave2Hz from '../../../InputSignals/sine_2_128_128.json';

$(document).ready(() => {

    const qsmap = queryStringToMap(window.location.search);
    const demo = qsmap.get('demo');
    const { x, h } = DEMOS[demo] || DEFAULT_DEMO;
    const y = convolve(x, h);

    $('#x').html(JSON.stringify(x));
    $('#h').html(JSON.stringify(h));
    $('#y').html(JSON.stringify(y));

    drawDiagram('svg-x', x, 'x[ ]');
    drawDiagram('svg-h', h, 'h[ ]');
    drawDiagram('svg-y', y, 'y[ ]');
});

// See p. 112 FIGURE 6-5
const DEMO_1 = {
    x: [0, -1, -1.2, 2, 1.2, 1.2, 0.6, 0, -0.6],
    h: [1, -0.5, -0.2, -0.1]
};

const DEMO_2 = {
    x: sineWave2Hz.x,
    h: createLowPassFilterKernel()
};

const DEMO_3 = {
    x: sineWave2Hz.x,
    h: createHighPassFilterKernel()
};

const DEMOS = {
    '1': DEMO_1,
    '2': DEMO_2,
    '3': DEMO_3,
};

const DEFAULT_DEMO = DEMO_1;
