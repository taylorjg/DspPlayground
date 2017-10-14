// import inputSignal from '../InputSignals/singleImpulse.json';
// import inputSignal from '../InputSignals/sine_1_4_4.json';
// import inputSignal from '../InputSignals/sine_1_16_16.json';
// import inputSignal from '../InputSignals/sine_1_16_32.json';
import inputSignal from '../InputSignals/sine_1_16_128.json';
// import inputSignal from '../InputSignals/sine_4_16_64.json';
// import inputSignal from '../InputSignals/sine_16_32_32.json';
// import inputSignal from '../InputSignals/sine_16_128_128.json';
import { dft, inverseDft } from '../dsp';
import { drawDiagram } from '../diagram';

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
