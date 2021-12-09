import React, {useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';
import '../index.css';


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
            cookies.set('id',response.data[1].id , { path: '/' });
            props.setId(response.data[1].id);
            props.history.push('/mostrartrabajadores');
            
        }
        catch(error){
            console.log(error)
            alert("No se ha podido iniciar sesión");
        }
    }

    return (
        <main className="loginContent">     
            <form onSubmit={login} className="formLogin">

                    <h1 >Bienvenido</h1> 
                    <div className="input email">
                        <input className="inputLogin" type="text" name="email" placeholder="Email" required
                        onChange={setDataValue} value={data.email}/>
                    </div>
                    <div className="input password">
                        <input className="inputLogin" type="password" name="password" placeholder="Contaseña" required
                        onChange={setDataValue} value={data.password}/>
                    </div>
                    <div className="button-group">
                        <button className="buttonLogin" type="submit">Iniciar sesión</button>
                    </div>
            </form>                       
        </main> 
    );    
}

export default withRouter(Login)

