import React, {useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie/es6';

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
            props.history.push('/');
        } catch (error) {
            if(error.response.status === 442) {
                setRecError(error.response.data.message);
            }
        }
    }
    return (
        <main>
       
            <section className="logBox">
                <div className= "registrorecluso">                              
                    <form onSubmit={darAlta}>
                        <div className="registerContent">
                            <h3>Registro Recluso</h3>
                            <input className="inputLogin" type="text" name="nombre" placeholder="Nombre" required
                                onChange={setDataValue}
                            />
                            <input className="inputLogin" type="text" name="apellido" placeholder="Apellido" required
                                onChange={setDataValue}
                            />
                            <input className="inputLogin" type="text" name="dni" placeholder="Dni" required
                                onChange={setDataValue}
                            />
                            <input className="inputLogin" type="textarea" name="descripcion" placeholder="Descripcion" required
                                onChange={setDataValue}
                            />
                            <input className="inputLogin" type="number" name="edad" placeholder="Edad" required
                                onChange={setDataValue}
                            />
                            <input className="inputLogin" type="text" name="id_celda" placeholder="Id_celda"
                                onChange={setDataValue}
                            />
                            <input type="file" name="foto"  
                                onChange={e => setFoto({selectedFile:e.target.files[0]})}
                            />
                            {recError === ""? (""):(<p className="rojo">{recError}</p>)}

                            <div className="button-group">
                                <button className="button" type="submit">Registrar</button>
                            </div>

                        </div>
                    </form>
                </div> 
            </section>
       
    </main>
        );

}

export default withRouter(AltaRecluso)