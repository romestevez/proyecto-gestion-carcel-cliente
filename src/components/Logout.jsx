import {withRouter} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie/es6';
import { useEffect } from 'react';

const cookies = new Cookies();

const Logout = (props) => {

    useEffect(() => {
       cerrarsesion()
    },[])

    const cerrarsesion = async () => {
        try{    
            const response = await axios({
                method: 'get',
                url: 'http://localhost:80/api/logout',
                withCredentials: true,
                credentials: 'include',
            });
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            props.setId("");
            cookies.remove('jwt');
            props.history.push('/')
        }
        catch(error){
            console.log(error)
            
        }
    }
    return (
        <></>
    )
}
export default withRouter(Logout)