import './App.css';
import React, {useState, useEffect} from 'react';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Cookies from 'universal-cookie';
import {BrowserRouter, Route, Router, Switch, Redirect, Link} from "react-router-dom";
import Reclusos from './components/Reclusos';
import Registro from './components/Registro';
import MostrarTrabajador from './components/MostrarTrabajador';
import EditarTrabajador from './components/EditarTrabajador';
import EditarRecluso from './components/EditarRecluso';
import Dropdown from './components/Dropdown';
import MostrarReclusos from './components/MostrarReclusos';
import Historial from './components/Hisotrial';
import Perfil from './components/Perfil';
import Logout from './components/Logout';
import axios from 'axios'


const cookies = new Cookies();

function App() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');

  const [data, setData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    edad: '',
    email: '',
    n_tlf: '',
    rol: '',
  })
 

  useEffect(() => {
      obtenerAuth()
  },[])

  const obtenerAuth = async (props) => {
    try{
        const response = await axios({
        method: 'get',
        url: 'http://localhost:80/api/user',
        withCredentials: true,
        })
        // Metemos los datos que obtenemos de la llamada al backen en Data para usarlos posteriormente, en este caso lo usamos para poder pasarle el parametro ID al navbar
        setData(response.data);
        setId(response.data["id"]);
        } catch (error) {
          if(error.response.status === 401){
            setId("");
          }
            
        };
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Navbar id={id}>
            <Dropdown setId={setId}></Dropdown>
          </Navbar>
        </header>
        <div className="background">
          <img src="/img/bg-david.svg" alt="imagen fondo vectorial"/>
        </div>
        <Switch>
          <Route exact path="/"  component={() => <Login setId={setId} />}/>
          <Route path="/historial/:id" component={Historial}/>
          <Route path="/editarrecluso/:id" component={EditarRecluso}/>
          <Route path="/editartrabajador/:id" component={EditarTrabajador}/>
          <Route path="/mostrartrabajadores" component={() => <MostrarTrabajador/>}/>
          <Route path="/mostrarreclusos" component={() => <MostrarReclusos/>}/>
          <Route path="/registro" component={() => <Registro name={nombre} setNombre={setNombre} setId={setId} />}/>
          <Route path="/registrorecluso" component={() => <Reclusos name={nombre} setNombre={setNombre} setId={setId} />}/>
          <Route path="/perfil" component={Perfil}/>
          <Route path="/logout" component={() => <Logout setId={setId}/>}/>
        </Switch>
      </BrowserRouter>
      <footer>
        <p>Proyecto realizado por David Estévez Romero</p>
      </footer>
    </div>
  );
}

export default App;
