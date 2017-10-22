import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <ul>
            <li>Chapter 6</li>
            <ul>
                <li>
                    <Link to="/convolution/demo/1">Convolution (example from p. 112)</Link>
                </li>
                <li>
                    <Link to="/convolution/demo/2">Convolution (sine wave 2hz and low pass filter similar to 14-5b)</Link>
                </li>
                <li>
                    <Link to="/convolution/demo/3">Convolution (sine wave 2hz and high pass filter similar to 14-7d)</Link>
                </li>
            </ul>
            <li>Chapter 8</li>
            <ul>
                <li>
                    <Link to="/dft">DFT</Link>
                </li>
            </ul>
            <li>Unknown</li>
            <ul>
                <li>
                    <Link to="/misc/addingSineWaves">Adding Sine Waves</Link>
                </li>
            </ul>
        </ul>
    );
};

export default Menu;
