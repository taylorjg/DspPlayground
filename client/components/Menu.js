import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">

                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">DSP Playground</a>
                </div>

                <div className="collapse navbar-collapse" id="navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                Demos <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="dropdown dropdown-submenu">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        Chapter 6
                                    </a>
                                    <ul className="dropdown-menu">
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
                                </li>

                                <li className="dropdown dropdown-submenu">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        Chapter 8
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/dft">DFT</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li role="separator" className="divider"></li>

                                <li className="dropdown dropdown-submenu">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        Miscellaneous
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/misc/addingSineWaves">Adding Sine Waves</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
