import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';


const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
        setDropdown(false);
        } else {
        setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
        setDropdown(false);
        } else {
        setDropdown(false);
        }
    };
    return (
      <nav className='navbar'>
        
        <div className="name-apli">Carcel</div>  
        <ul className='nav-menu'>
        
          <li className='nav-item'>
            <Link to='/mostrartrabajadores'className='nav-links'>
              Trabajadores
            </Link>
          </li>
          <li className='nav-item' >
            <Link to='/reclusos' className='nav-links'>
              Reclusos
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/historial' className='nav-links'>
              Historial
            </Link>
          </li>   
          <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <FontAwesomeIcon className='nav-icon' icon={faUserCircle} size='2x' />
            {dropdown && <Dropdown />}
          </li>     
        </ul>
      
      </nav>
    )

}

export default Navbar;