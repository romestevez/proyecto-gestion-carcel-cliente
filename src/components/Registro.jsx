import React, {useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

const Registro = (props) => {
    const [userErr, setUserErr] = useState ('');
    const [data, setData] = useState ({
        nombre: '',
        apellido: '',
        n_tlf: '',
        email: '',
        dni: '',
        edad: '',
        rol: '',
        password: '',

    });

    const setDataValue = (e) => {  
        setData({ ...data, [e.target.name]: e.target.value });  
      }  

    const procesarDatos = async (e) => {
        e.preventDefault()
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(data.email.match(validRegex)) {
           
            // setError("Escribe un email")
        }
        if(!data.password.trim()) {
            // setError("Escribe una password")
        }
        if(data.password.length<8) {
            // setError("Escribe una contraseña de 6 o mas carácteres")
        } else {
            registro()
        }
    }

    const registro = async () => {
        // Hacemos las llamadas al backend de forma asyncrona para no seguir hasta obtener respuesta, para ello usamos la libreria axios.
        try { 
            const response = await axios({
                method: 'post',
                url: 'http://localhost:80/api/createUser',
                withCredentials: true,
                data: data
            });
            cookies.set('id', response.data[0].id, { path: '/'});
            props.setId(response.data[0].id);
            props.setNombre(response.data[0].nombre);
            props.history.push('/');
        } catch (error) {
            if(error.response.status === 422){
                setUserErr(error.response.data.message);
            }
        }
    }
    
    return (
        <main>
            <form className="registerForm" onSubmit={procesarDatos}>
                
                <h1>Registro de empleado</h1>
                <div className="registerContent">
                    <div>
                        <label>Nombre</label>
                        <input className="inputLogin" type="text" name="nombre" placeholder="Nombre" required onChange={setDataValue}/>
                    </div>
                    
                    <div>
                        <label>Apellido</label>
                        <input className="inputLogin" type="text" name="apellido" placeholder="Apellido" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Nº de teléfono</label>
                        <input className="inputLogin" type="text" name="n_tlf" placeholder="Número de teléfono" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Edad</label>
                        <input className="inputLogin" type="number" name="edad" placeholder="Edad" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Dni</label>
                        <input className="inputLogin" type="text" name="dni" placeholder="Dni" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Email</label>
                        <input className="inputLogin" type="text" name="email" placeholder="Email" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Contraseña</label>
                        <input className="inputLogin" type="password" name="password" placeholder="Password" required onChange={setDataValue} />
                    </div>
                    <div>
                        <label>Rol</label>
                        <select required name="rol" className="rol" onChange={setDataValue}  >
                            <option name="">Elegir Rol</option>
                            <option name="administrador">Administrador</option>
                            <option name="guardia">Guardia</option>
                            <option name="alcaide">Alcaide</option>
                            <option name="enfermero">Enfermero</option>
                        </select>
                    </div>

                    <div className="registerButton">
                        <button className="addButton" type="submit">Registrar</button>
                    </div>

                </div>
            </form>
        </main>
    );
}
export default withRouter(Registro)