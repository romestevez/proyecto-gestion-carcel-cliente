import React, {useState} from 'react';
import axios from 'axios'
import { useEffect } from 'react';


const EditarRecluso = (props) => {

    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        n_tlf: '',
        edad: '',
        email: '',
    })
    
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
                url: `http://localhost:80/api/user/${props.match.params.id}`,
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
                url: `http://localhost:80/api/update/user/${props.match.params.id}`,
                withCredentials: true,
                data: data
            });
            props.history.push('/mostrartrabajadores');
        } catch(error){

        }
    }
    return (
        <main>
            <div className= "registerForm">                              
                <form onSubmit={update}>
                    <h1>Perfil de {data["nombre"]}</h1>
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
                            <label>Email</label>
                            <input className="inputLogin" type="text" name="email"  placeholder="Email" required value={data["email"]} onChange={setDataValue}/>
                        </div>

                        <div>
                            <label>Edad</label>
                            <input className="inputLogin" type="number" name="edad" placeholder="Edad" required value={data["edad"]} onChange={setDataValue}/>
                        </div>

                        <div>
                            <label>Nº de teléfono</label>
                            <input className="inputLogin" type="text" name="n_tlf" placeholder="N_tlf" value={data["n_tlf"]} onChange={setDataValue}/>
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