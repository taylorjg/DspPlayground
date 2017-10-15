// import inputSignal from '../../../InputSignals/sine_2_128_128.json';
import inputSignal1 from '../../../InputSignals/sine_2_128_128.json';
import inputSignal2 from '../../../InputSignals/sine_8_128_128.json';
import { dft, inverseDft } from '../../../dsp';
import { drawDiagram } from '../../../diagram';

$(document).ready(() => {

    // const x = inputSignal.x;
    const signal1 = inputSignal1.x;
    const signal2 = inputSignal2.x;
    const x = signal1.map((value, index) => value + signal2[index]);
    const { ReX, ImX } = dft(x);
    const x2 = inverseDft(ReX, ImX);

    $('#x').html(JSON.stringify(x));
    $('#ReX').html(JSON.stringify(ReX));
    $('#ImX').html(JSON.stringify(ImX));
    $('#x2').html(JSON.stringify(x2));

    drawDiagram('svg-x', x, 'x[ ]');
    drawDiagram('svg-ReX', ReX, 'Re X[ ]');
    drawDiagram('svg-ImX', ImX, 'Im X[ ]');
    drawDiagram('svg-x2', x2, 'x2[ ]');
});
