import { useState, useEffect, createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')
        
        if(!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const {data} = await axios('http://localhost:4000/api/usuarios/perfil', config)
            setAuth(data)
            // navigate('/proyectos')
        } catch (error) {
            setAuth({})
        }
        setCargando(false)
      }
      autenticarUsuario()
      
    }, [])
    
    const cerrarSeccionAuth = () => {
        setAuth({})
    }

    return(
        <AuthContext.Provider value={{  
            auth,
            setAuth,
            cargando,
            cerrarSeccionAuth}}>
                {children}
        </AuthContext.Provider>
    )
} 

export {AuthProvider}

export default AuthContext;