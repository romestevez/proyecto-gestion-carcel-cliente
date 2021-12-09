import React, {useState} from 'react';
import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faEdit, faEye} from '@fortawesome/free-solid-svg-icons';
import '../index.css';

const cookies = new Cookies();

const MostrarReclusos = (props) => {
    const defaultData = {"data":[],"prev_page_url":'',"next_page_url":''};
    const [listaReclusos, setListaReclusos] = useState(defaultData);
    const [trabError, setTrabError] = useState ('');

    useEffect(() => {
        mostrarTodo()
    },[])

    const mostrarTodo = async (search = '') => {
        try{
            const response = await axios({
            method: 'get',
            url: `http://localhost:80/api/mostrarreclusos?q=${search}`,
            withCredentials: true,
            })
            setListaReclusos(response.data);
            } catch (error) {
                setListaReclusos(defaultData);
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
            
            setListaReclusos(response.data);
            } catch (error) {
                setListaReclusos(defaultData);
            if(error.response && error.response.status === 442) {
                setTrabError(error.response.data.message);
            }

            setTrabError('No funciona sosio');
            };
    }

      const borrarRecluso = async (id) => {
        try {
            const response = await axios ({
                method: 'delete',
                url: `http://localhost:80/api/delete/recluso/${id}`,
                withCredentials: true,
            })
            mostrarTodo();

        } catch(error) {
        if(error) {
            setTrabError(error);
        }}; 
      }

      const buscarReclusos = async (event) => {
          let search = event.target.value;

          mostrarTodo(search);
      }

return (

    <main>
        <div className="flexTables">
            

            <div className="div-title">
                <h1>Lista de reclusos</h1>
                <div className="addFilt">
                    <input type="text" name="q" placeholder="Buscar..." onChange={buscarReclusos} className='filtrador' />
                    <button className="addButton"><Link to='/registrorecluso' className='nav-links'>Añadir</Link></button>
                </div>
                
            </div>

            <table className='tabla-princ'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Dni</th>
                        <th>Id_Celda</th>
                        <th>Descripción</th>
                        <th>Historial</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody className='body-tabla'>
                    {listaReclusos["data"].map(item => (
                        <tr key ={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.apellido}</td>
                            <td>{item.edad}</td>
                            <td>{item.dni}</td>
                            <td>{item.id_celda}</td>
                            <td>{item.descripcion}</td>
                            <td><Link className='historial-link' to={`/historial/${item.id}`}><FontAwesomeIcon className='nav-icon' icon={faEye}/></Link></td>
                            <td><Link to={`/editarrecluso/${item.id}`} className='nav-icon'><FontAwesomeIcon className='nav-icon' icon={faEdit}/></Link></td>
                            <td><FontAwesomeIcon onClick={() => borrarRecluso(item.id)} className='nav-icon-delete' icon={faTrash}/></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        
            <div className='pagination-buttons'>
                <button className="paginateButton" onClick={() => mostrarPagina(listaReclusos["first_page_url"])}>Primera</button>   
                <button className="paginateButton" onClick={() => mostrarPagina(listaReclusos["prev_page_url"])}>Anterior</button> 
                <button className="paginateButton" onClick={() => mostrarPagina(listaReclusos["next_page_url"])}>Siguiente</button>
                <button className="paginateButton" onClick={() => mostrarPagina(listaReclusos["last_page_url"])}>Última</button>  
            </div>
        </div>
    </main>
)}
export default withRouter(MostrarReclusos)