import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'
import useAuth from '../hooks/useAuth'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

const {setAuth} = useAuth();

const navigate = useNavigate()

  const handleSubmit = async event => {
        event.preventDefault()

        if([email,password].includes('')) {
          setAlerta({
            msg: 'Todos los campos son obligatorios',
            error:true
          })
          return
        }

        try {
          const {data} = await axios.post(`https://uptaskmernbackend-production-0971.up.railway.app/api/usuarios/login`, {email,password})
          localStorage.setItem('token', data.token)
          setAuth(data)
          navigate('/proyectos')
          console.log(data)
        } catch (error) {
          console.log(error)
          setAlerta({
            msg:error.response.data.msg,
            error:true
          })
        }
  }


  const {msg} = alerta
  return (
    <>
      <h1 className="text-sky-900 font-black text-6xl">Inicia Seccion </h1>
        {msg && <Alerta alerta={alerta}/>}
      <form 
        onSubmit={handleSubmit}
      className="my-10 bg:white shadow p-10 shadow">

          <div className="my-5">
            <label className="uppercase text-gray-800 block text-xl font-bold"
              htmlFor="email">Email</label>
            <input 
                  id="email" type="email" 
                  placeholder="Email de Registro" 
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                  value={email}
                  onChange={e => setEmail(e.target.value)}/>
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password">contraseña</label>
            <input 
                  id="password" 
                  type="password" 
                  placeholder="Contraseña de Registro" 
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  />
          </div>

          <div>
            <input type="submit" value='Iniciar Sesion' 
              className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
          </div>
      </form>
      <nav className='lg:flex lg:justify-between'> 
            <Link className="block text-center my-5 text-slate-500 
                uppercase text-sm" to="/registrar" >¿No tienes una cuenta? Registrate</Link>
                
            <Link className="block text-center my-5 text-slate-500 
                uppercase text-sm" to="/olvide-password" >Olvide mi contraseña</Link>
          </nav> 
      

    </>
  )
}

export default Login