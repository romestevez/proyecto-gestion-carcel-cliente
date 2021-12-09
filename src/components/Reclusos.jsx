import React, {useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';
import '../index.css';

const cookies = new Cookies();
const AltaRecluso = (props) => {

    const [recError, setRecError] = useState ('')
    const [foto, setFoto] = useState ([])
    const [data, setData] = useState ({
        nombre: '',
        apellido: '',
        dni: '',
        descripcion: '',
        edad: '',
        id_celda: '',

    });

    // Función para poder insertar posteriormente los datos del formulario.
    const setDataValue = (e) => {  
        setData({ ...data, [e.target.name]: e.target.value });  
      }

    const darAlta = async (e) => {
        e.preventDefault()
        const data1 = new FormData();
        data1.append('nombre', data.nombre);
        data1.append('apellido', data.apellido);
        data1.append('dni', data.dni);
        data1.append('descripcion', data.descripcion);
        data1.append('edad', data.edad);
        data1.append('id_celda', data.id_celda);
        data1.append('foto', foto.selectedFile);
        // Añadimos cada uno de los campos al FormData para poder mandarlo al backend (Tiene que ser FormData porque tiene un elemento de tipo file)
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:80/api/createRecluso',
                withCredentials: true,
                data: data1
            });
            cookies.set('id',response.data[0].id , { path: '/' });
            props.setId(response.data[0].id);
            props.setNombre(response.data[0].nombre);
            props.history.push('/mostrarreclusos');
        } catch (error) {
            if(error.response.status === 442) {
                setRecError(error.response.data.message);
            }
        }
    }
    return (
        <main>                             
            <form className="registerForm" onSubmit={darAlta}>
                <h1>Registro Recluso</h1>
                <div className="registerContent">
                   
                    <div>
                        <label>Nombre</label>
                        <input className="inputRegister" type="text" name="nombre" placeholder="Nombre" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Apellido</label>
                        <input className="inputRegister" type="text" name="apellido" placeholder="Apellido" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Dni</label>
                        <input className="inputRegister" type="text" name="dni" placeholder="Dni" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Edad</label>
                        <input className="inputRegister" type="number" name="edad" placeholder="Edad" required onChange={setDataValue}/>
                    </div>

                    <div>
                        <label>Descripción</label>
                        <textarea className="inputRegister" name="descripcion"  placeholder="Descripcion" required onChange={setDataValue}/>
                    </div>
                    
                    <div>
                        <label>Id Celda</label>
                        <input className="inputRegister" type="text" name="id_celda" placeholder="Id_celda" required onChange={setDataValue}/>
                    </div>

                    <div className="fileDiv">
                        <label>Foto</label>
                        <input type="file" name="foto" onChange={e => setFoto({selectedFile:e.target.files[0]})}/>
                    </div>

                    <div className="registerButton">
                        <button className="addButton" type="submit">Registrar</button>
                    </div>

                </div>
            </form>   
    </main>
        );

}

export default withRouter(AltaRecluso)