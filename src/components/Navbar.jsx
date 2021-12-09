import React, { useState, useEffect } from 'react';
import '../index.css';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';



const Navbar = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const onMouseEnter = () => {
        if (window.innerWidth < 560) {
        setDropdown(false);
        } else {
        setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 560) {
        setDropdown(false);
        } else {
        setDropdown(false);
        }
    };
    return (
      <nav className='navbar'>
        <div className="name-apli"><img className="logo" src="/img/logo-los-laureles.svg"></img></div>
          <ul className={props.id === '' ?  'nav-menu-hidden' : 'nav-menu' }>

            <li className='nav-item'>
              <Link to='/mostrartrabajadores' className='nav-links'>
                Trabajadores
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/mostrarreclusos' className='nav-links'>
                Reclusos
              </Link>
            </li>
            <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <FontAwesomeIcon className='icon-perfil' icon={faUserCircle} size='2x' />
              {dropdown && <Dropdown />}
            </li>
          </ul>
      
      </nav>
    )

}

export default withRouter(Navbar);