import React from 'react';
import { Link } from 'react-router-dom';
import { demosMenuData } from '../demosMenuData';

const Menu = () => {

    const populateDemosDropdownMenu = () =>
        demosMenuData.map((section, sectionIndex) => {
            return <li className="dropdown dropdown-submenu" key={sectionIndex}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    {section.label}
                </a>
                <ul className="dropdown-menu">
                    {
                        section.items.map((item, itemIndex) => {
                            return <li key={itemIndex}>
                                <Link to={item.link}>{item.label}</Link>
                            </li>
                        })
                    }
                </ul>
            </li>
        })

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
                                {populateDemosDropdownMenu()}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
