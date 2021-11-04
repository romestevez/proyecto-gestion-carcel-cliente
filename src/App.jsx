import './App.css';
import axios from 'axios'
import React, {useState} from 'react';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import {BrowserRouter, Route, Router, Switch, Redirect, Link} from "react-router-dom";
import Reclusos from './components/Reclusos';
import Registro from './components/Registro';
import MostrarTrabajador from './components/MostrarTrabajador';

const cookies = new Cookies();

function App() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  useEffect(() => {
    (      
      async () => {
        try{
          const response = await axios({
            method: 'get',
            url: 'http://localhost:80/api/user',
            withCredentials: true,
          })
            cookies.set('id',response.data.id);
            setId(response.data.id);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
          } catch (error) {
            if(error.response.status === 401){
              setId("visitor");
            }};     
      }
    )();
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
        
        <Route>
          <Navbar/>
        </Route>
        <Switch>
          <Route path="/mostrartrabajadores" component={() => <MostrarTrabajador/>}/>
          <Route path="/login" component={() => <Login name={nombre} setNombre={setNombre} setId={setId} />}/>
          <Route path="/registro" component={() => <Registro name={nombre} setNombre={setNombre} setId={setId} />}/>
          <Route path="/registrorecluso" component={() => <Reclusos name={nombre} setNombre={setNombre} setId={setId} />}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
