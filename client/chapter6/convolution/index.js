import { convolve } from '../../../dsp';
import { drawDiagram } from '../../../diagram';

$(document).ready(() => {

    const x = [0, -1, -1.2, 2, 1.2, 1.2, 0.6, 0, -0.6];
    const h = [1, -0.5, -0.2, -0.1];
    const y = convolve(x, h);
    
    $('#x').html(JSON.stringify(x));
    $('#h').html(JSON.stringify(h));
    $('#y').html(JSON.stringify(y));

    drawDiagram('svg-x', x, 'x[ ]');
    drawDiagram('svg-h', h, 'h[ ]');
    drawDiagram('svg-y', y, 'y[ ]');
});
