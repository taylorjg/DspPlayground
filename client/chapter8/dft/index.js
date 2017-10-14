import inputSignal from '../../../InputSignals/sine_1_16_32.json';
import { dft, inverseDft } from '../../../dsp';
import { drawDiagram } from '../../../diagram';

$(document).ready(() => {

    const x = inputSignal.x;
    const { ReX, ImX } = dft(x);
    const x2 = inverseDft(ReX, ImX);

    $('#x').html(JSON.stringify(x));
    $('#ReX').html(JSON.stringify(ReX));
    $('#ImX').html(JSON.stringify(ImX));
    $('#x2').html(JSON.stringify(x2));

    drawDiagram('svg-x', x, 'x[]');
    drawDiagram('svg-ReX', ReX, 'Re X[]');
    drawDiagram('svg-ImX', ImX, 'Im X[]');
    drawDiagram('svg-x2', x2, 'x2[]');
});
