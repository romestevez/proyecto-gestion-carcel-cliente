import React, {useState} from 'react';
import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import '../index.css';

const cookies = new Cookies();

const MostrarTrabajadores = (props) => {
    const defaultData = {"data":[],"prev_page_url":'',"next_page_url":''};
    const [listaUsers, setListaUsers] = useState(defaultData);
    const [trabError, setTrabError] = useState ('');

      useEffect(() => {
          mostrarTodo()
      },[])

      const mostrarTodo = async (search = '') => {
        try{
            const response = await axios({
              method: 'get',
              url: `http://localhost:80/api/mostrarusers?q=${search}`,
              withCredentials: true,
            })
            setListaUsers(response.data);
            } catch (error) {
                setListaUsers(defaultData);
              if(error.response && error.response.status === 442) {
                  setTrabError(error.response.data.message);
              }
              setTrabError('No funciona sosio');
            };
        }
        const mostrarPagina = async (url = '') => {
            try{
                const response = await axios({
                method: 'get',
                url: url,
                withCredentials: true,
                })
                
                setListaUsers(response.data);
                } catch (error) {
                    setListaUsers(defaultData);
                if(error.response && error.response.status === 442) {
                    setTrabError(error.response.data.message);
                }
    
                setTrabError('No funciona sosio');
                };
        }

      const borrarUser = async (id) => {
        try {
            const response = await axios ({
                method: 'delete',
                url: `http://localhost:80/api/delete/user/${id}`,
                withCredentials: true,
            })
            mostrarTodo();

        } catch(error) {
        if(error) {
            setTrabError(error);
        }}; 
      }

      const buscarUsuarios = async (event) => {
          let search = event.target.value;

          mostrarTodo(search);
      }

return (

    <main>
        <div className="flexTables">
            

            <div className="div-title">
                <h1>Lista de trabajadores</h1>
                <div className="addFilt">
                    <input type="text" name="q" placeholder="Buscar..." onChange={buscarUsuarios} className='filtrador' />
                    <button className="addButton"><Link to='/registro' className='nav-links'>Añadir</Link></button>   
                </div>
            </div>

            <table className='tabla-princ'>
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
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody className='body-tabla'>
                    {listaUsers["data"].map(item => (
                        <tr key ={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.apellido}</td>
                            <td>{item.edad}</td>
                            <td>{item.email}</td>
                            <td>{item.n_tlf}</td>
                            <td>{item.dni}</td>
                            <td>{item.rol}</td>
                            <td><Link to={`/editartrabajador/${item.id}`} className='nav-icon'><FontAwesomeIcon className='nav-icon' icon={faEdit}/></Link></td>
                            <td><FontAwesomeIcon onClick={() => borrarUser(item.id)} className='nav-icon-delete' icon={faTrash}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='pagination-buttons'>
                <button className="paginateButton" onClick={() => mostrarPagina(listaUsers["first_page_url"])}>Primera</button>   
                <button className="paginateButton" onClick={() => mostrarPagina(listaUsers["prev_page_url"])}>Anterior</button> 
                <button className="paginateButton" onClick={() => mostrarPagina(listaUsers["next_page_url"])}>Siguiente</button>
                <button className="paginateButton" onClick={() => mostrarPagina(listaUsers["last_page_url"])}>Última</button>   
            </div>
            
        </div>
    </main>
)}
export default withRouter(MostrarTrabajadores)