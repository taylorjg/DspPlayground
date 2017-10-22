import inputSignal1 from '../../../InputSignals/sine_2_128_128.json';
import inputSignal2 from '../../../InputSignals/sine_8_128_128.json';
import { drawDiagram } from '../../../diagram';

$(document).ready(() => {

    const signal1 = inputSignal1.x;
    const signal2 = inputSignal2.x;
    const signal3 = signal1.map((value, index) => value + signal2[index]);
    
    $('#signal1').html(JSON.stringify(signal1));
    $('#signal2').html(JSON.stringify(signal2));
    $('#signal3').html(JSON.stringify(signal3));

    drawDiagram('svg-signal1', signal1, 'signal1[ ]');
    drawDiagram('svg-signal2', signal2, 'signal2[ ]');
    drawDiagram('svg-signal3', signal3, 'signal3[ ] = signal1[ ] + signal2[ ]');
});
