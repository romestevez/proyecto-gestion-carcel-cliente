import React, {useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();



const Login = (props) => {

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

    const login = async (e) => {
        e.preventDefault();
        try{    
            const response = await axios({
                method: 'post',
                url: 'http://localhost:80/api/login',
                withCredentials: true,
                data: {
                    "email": data.email,
                    "password": data.password
                }
            });
            console.log(response);
            cookies.set('id',response.data[0].id , { path: '/' });
            props.setId(response.data[0].id);
            props.setNombre(response.data[0].nombre);           
            props.history.push('/');

        }
        catch(error){
            console.log(error)
            alert("No se ha podido iniciar sesión");
        }
    }

    return (
        <main>
            <section>
                <h2 className="loginTitle">
                    Iniciar sesión
                </h2>

                <section className="logBox">
                    <div className="iniciaSesion">                            
                        <form onSubmit={login}>
                            <div className="loginContent">
                                <h3>Bienvenido</h3>
                                <input className="inputLogin" type="text" name="email" placeholder="Email" required
                                    onChange={setDataValue} value={data.email}/>

                                <input className="inputLogin" type="password" name="password" placeholder="Password" required
                                    onChange={setDataValue} value={data.password}/>

                                <div className="button-group">
                                    <button className="button" type="submit">Iniciar sesión</button>
                                </div>
                            </div>
                        </form>                       
                    </div> 
                </section>
            </section>
        </main>
        
    );    
}

export default withRouter(Login)

