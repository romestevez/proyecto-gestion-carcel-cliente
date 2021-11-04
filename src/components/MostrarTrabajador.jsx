import React, {useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import EditarTrabajador from './EditarTrabajador';

const cookies = new Cookies();

const MostrarTrabajadores = (props) => {
    const [listaUsers, setListaUsers] = useState([]);
    const [trabError, setTrabError] = useState ('');

      useEffect(() => {
          mostrarTodo()
      },[])

      const mostrarTodo = async  () => {
        try{
            const response = await axios({
              method: 'get',
              url: 'http://localhost:80/api/mostrarusers',
              withCredentials: true,
            })
            cookies.set('id', response.data[0].id, { path: '/'});
            setListaUsers(response.data);
            } catch (error) {
              if(error.response.status === 442) {
                  setTrabError(error.response.data.message);
              }};     
      }

      const borrarUser = async (id) => {
        try {
            const response = await axios ({
                method: 'delete',
                url: 'http://localhost:80/api/delete/user/' + id,
                withCredentials: true,
            })
            mostrarTodo();

        } catch(error) {
        if(error) {
            setTrabError(error);
        }}; 
      }

return (

    <div>
        <h3>Lista de trabajadores</h3>

        <table className='tabla-trab'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Dni</th>
                    <th>Rol</th>
                </tr>
            </thead>
            <tbody className='body-tabla'>
                {listaUsers.map(item => (
                    <tr key ={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido}</td>
                        <td>{item.edad}</td>
                        <td>{item.email}</td>
                        <td>{item.n_tlf}</td>
                        <td>{item.dni}</td>
                        <td>{item.rol}</td>
                        <td><FontAwesomeIcon onClick={ <EditarTrabajador id={item.id}/>} className='nav-icon' icon={faEdit}/></td>
                        <td><FontAwesomeIcon onClick={() => borrarUser(item.id)} className='nav-icon' icon={faTrash}/></td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}
export default withRouter(MostrarTrabajadores)