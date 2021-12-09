import React, {useState} from 'react';
import axios from 'axios'
import { useEffect } from 'react';


const EditarRecluso = (props) => {

    const [foto, setFoto] = useState ([]);
    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        descripcion: '',
        edad: '',
        id_celda: '',
    })
    
    console.log(props.id);
    useEffect(() => {
        obtenerDatos()
    },[])

    const setDataValue = (e) => {  
        setData({ ...data, [e.target.name]: e.target.value });  
      }

    const obtenerDatos = async () => {
        
        try { 
            
            const response = await axios({
                method: 'get',
                url: `http://localhost:80/api/recluso/${props.match.params.id}`,
                withCredentials: true,
            });
            setData(response.data);
        } catch (error) {
            alert("Ha ocurrido algo...")
        }
    }
    const update = async (e) => {
        e.preventDefault();
        try { 
            const response = await axios({
                method: 'put',
                url: `http://localhost:80/api/update/recluso/${props.match.params.id}`,
                withCredentials: true,
                data: data
            });
            props.history.push('/mostrarreclusos');
            // console.log(response.data);
        } catch(error){

        }
    }
    return (
        <main>
            <div className= "registerForm">                              
                <form onSubmit={update}>
                    <h1>{data["nombre"]}</h1>
                    <div className="registerContent">
                        <div>
                            <label>Nombre</label>
                            <input className="inputLogin" type="text" name="nombre" placeholder="Nombre" required value={data["nombre"]} onChange={setDataValue}/>
                        </div>

                        <div>
                            <label>Apellido</label>
                            <input className="inputLogin" type="text" name="apellido" placeholder="Apellido" required value={data["apellido"]} onChange={setDataValue}/>
                        </div>

                        <div>
                            <label>Dni</label>
                            <input className="inputLogin" type="text" name="dni" placeholder="Dni" required value={data["dni"]} onChange={setDataValue}/>
                        </div>

                        <div>
                            <label>Descripcion</label>
                            <textarea className="inputLogin" type="textarea" name="descripcion"  placeholder="Descripcion" required value={data["descripcion"]} onChange={setDataValue}/>
                        </div>

                        <div>
                            <label>Edad</label>
                            <input className="inputLogin" type="number" name="edad" placeholder="Edad" required value={data["edad"]} onChange={setDataValue}/>
                        </div>

                        <div>
                            <label>Id celda</label>
                            <input className="inputLogin" type="text" name="id_celda" placeholder="Id_celda" value={data["id_celda"]} onChange={setDataValue}/>
                        </div>

                        <div className="registerButton">
                            <button className="addButton" type="submit">Editar</button>
                        </div>

                    </div>
                </form>
            </div> 
    </main>
    );
    
}
export default EditarRecluso;