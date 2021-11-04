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
            <form onSubmit={procesarDatos}>
                <div className="registerContent">
                    <h3>Registro Empleado</h3>
                    <input className="inputLogin" type="text" name="nombre" placeholder="Nombre" required
                        onChange={setDataValue}
                    />
                    <input className="inputLogin" type="text" name="apellido" placeholder="Apellido" required
                        onChange={setDataValue}
                    />
                    <input className="inputLogin" type="text" name="n_tlf" placeholder="Número de teléfono" required
                        onChange={setDataValue}
                    />
                    <input className="inputLogin" type="number" name="edad" placeholder="Edad" required
                        onChange={setDataValue}
                    />
                    <input className="inputLogin" type="text" name="dni" placeholder="Dni" required
                        onChange={setDataValue}
                    />
                    <input className="inputLogin" type="text" name="email" placeholder="Email" required
                        onChange={setDataValue}
                    />
                    <input className="inputLogin" type="password" name="password" placeholder="Password" required
                        onChange={setDataValue}
                    />
                    <select required name="rol" className="rol" onChange={setDataValue}  >
                        <option name="">Elegir Rol</option>
                        <option name="administrador">Administrador</option>
                        <option name="guardia">Guardia</option>
                        <option name="alcaide">Alcaide</option>
                        <option name="enfermero">Enfermero</option>
                    </select>
                    {userErr === ""? (""):(<p className="rojo">{userErr}</p>)}

                    <div className="button-group">
                        <button className="button" type="submit">Registrar</button>
                    </div>

                    
                </div>
            </form>
        </main>
    );
}
export default withRouter(Registro)