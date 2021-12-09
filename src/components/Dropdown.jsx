import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';
import { Link } from 'react-router-dom';

const cookies = new Cookies();
const Dropdown = (props) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className='dropdown-menu'
      >
        <li className='dropdown-li'>
          <Link
            className='dropdown-link'
            to= '/perfil'
            onClick={() => setClick(false)}
          >
            Mi perfil
          </Link>
        </li>
        <li className='dropdown-li'>
        <Link to='/logout' className="menu-item" >Cerrar sesión</Link>
        </li>
      </ul>
    </>
  );
}

export default withRouter(Dropdown)
