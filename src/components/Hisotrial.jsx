import React, {useState} from 'react';
import axios from 'axios'
import { useEffect } from 'react';

const MostrarHistorial = (props) => {
    const [updateH, setUpdateH] = useState(false);
    const [data, setData] = useState({
        id_recluso: '',
        f_entrada: '',
        f_salida: '',
        antecedentes: '',
        reincidente: '',
    })

    const setDataValue = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        obtenerDatos()
    },[])
    
    const obtenerDatos = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `http://localhost:80/api/historial/${props.match.params.id}`,
                withCredentials: true,
            });
            setData(response.data);
        } catch (error) {
            alert('Ha ocurrido un error')
        }
    }
    const update = async (e) => {
        e.preventDefault();
        try { 
            const response = await axios({
                method: 'put',
                url: `http://localhost:80/api/update/historial/${props.match.params.id}`,
                withCredentials: true,
                data: data
            });
            props.history.push('/mostrarrecluso');
        } catch(error){

        }
    }

    return (
        <main>
            {updateH ? 
                (<form className="registerForm" onSubmit={update}>
                    <h1>Historial del recluso</h1>
                    <div className="registerContent">
                        <div>
                            <label>Fecha de entrada</label>
                            <input type="date" name="f_entrada" placeholder="Fecha de entrada" onChange={setDataValue} value={data["f_entrada"]} />
                        </div>

                        <div>
                            <label>Fecha de salida</label>
                            <input type="date" name="f_salida" placeholder="Fecha de salida" onChange={setDataValue} value={data["f_salida"]}/>
                        </div>

                        <div>
                            <label>Antecedentes</label>
                            <input type="text" name="antecedentes" placeholder="Antecedentes" onChange={setDataValue} value={data["antecedentes"]} />
                        </div>

                        <div>
                            <label>Reincidente</label>
                            <select name="reincidente" onChange={setDataValue}>
                                <option name="si">Si</option>
                                <option name="no">No</option>
                            </select>
                        </div>
                        <div className="historialButton">
                            <button className="paginateButton" type="submit">Editar</button>
                            <button className="paginateButton" onClick={() => setUpdateH(!updateH)}>Volver</button>
                        </div>
                    </div>
                </form>)
                :
                (<div className="historialDiv">
                    <h1>Historial del recluso</h1>
                    <ul>
                        <li>
                            <h2>Id Recluso</h2>
                            {data["id_recluso"]}
                        </li>
                        <li>
                            <h2>Fecha de entrada</h2>
                            {data["f_entrada"]}
                        </li>
                        <li>
                            <h2>Fecha de salida</h2>
                            {data["f_salida"]}
                        </li>
                        <li>
                            <h2>Antecedentes</h2>
                            {data["antecedentes"]}
                        </li>
                        <li>
                            <h2>Reincidente</h2>
                           {data["reincidente"]}
                        </li>
                    </ul>
                    <button className="paginateButton" onClick={() => setUpdateH(!updateH)}>Editar</button>
                </div>)
            }
        </main>
    )
}
export default MostrarHistorial;