import React, {useState} from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../index.css';


const Perfil = (props) => {
    const [data, setData] = useState({
        nombre: '',
        apelpdo: '',
        dni: '',
        edad: '',
        email: '',
        n_tlf: '',
        rol: '',
    })

    useEffect(() => {
        mostrarPerfil()
    },[])

    const mostrarPerfil = async (props) => {
        try{
            const response = await axios({
            method: 'get',
            url: 'http://localhost:80/api/user',
            withCredentials: true,
            })
            setData(response.data);
            } catch (error) {
                console.log(error);
                alert("Ha ocurrido algo...")
            };
    }
    return (
        <main className="mainProfile">

            <div className="profileContent">
                <h1>Perfil de {data["nombre"]}</h1>
                <div className="profileList">
                    <div>
                        <h2> Nombre </h2>
                        <p>{data["nombre"]}</p>
                    </div>
                    <div>
                        <h2> Apellido </h2>
                        <p>{data["apellido"]}</p>
                    </div>
            
                    <div>
                        <h2> Edad </h2>
                        <p>{data["edad"]}</p>
                    </div>
            
                    <div>
                        <h2> Número de tlf </h2>
                        <p>{data["n_tlf"]}</p>
                    </div>
                    <div>
                        <h2> Email </h2>
                        <p>{data["email"]}</p>
                    </div>
                    <div>
                        <h2> Dni </h2>
                        <p>{data["dni"]}</p>
                    </div>
                    <div>
                        <h2> Rol </h2>
                        <p>{data["rol"]}</p>
                    </div>
                    <div className="profileButtonDiv">
                        <button className="profileButton"><Link to={`/editartrabajador/${data["id"]}`} className="profileLink">Editar</Link></button>
                    </div>
                    
                </div>
            </div>
            

        </main>
    )
}

export default Perfil;