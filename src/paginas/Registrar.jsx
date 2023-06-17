import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import axios from 'axios'


const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})


const handleSubmit = async (event) => {
    event.preventDefault();

    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({
        msg:'Todos los campos son abligatorios',
        error:true
      })
      return;
    }

    if(password !== repetirPassword) {
      setAlerta({
        msg:'Las contraseña no son iguales',
        error:true
      })
      return;
    }

    if(password.length < 6) {
      setAlerta({
        msg:'La contraseña debe tener minimos 6 caracteres',
        error:true
      })
      return;
    }

    setAlerta({})

    try {
   const {data} = await axios.post(`https://uptaskmernbackend-production-0971.up.railway.app/api/usuarios`, {nombre,email,password})
        setAlerta({
          msg: data.msg,
          error: false
        })
        setNombre('')
        setEmail('')
        setPassword('')
        setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
}

const {msg} = alerta


  return (
    <>
      <h1 className="text-sky-900 font-black text-6xl ">Crea Tu Cuenta</h1>

      {msg && <Alerta alerta={alerta}/>}

      <form className="my-10 bg:white shadow p-10 shadow"
        onSubmit={handleSubmit}
      >

      <div className="my-5">
            <label className="uppercase text-gray-800 block text-xl font-bold" htmlFor="nombre">Nombre</label>
            <input 
              id="nombre" 
              type="text" 
              placeholder="Tu Nombre" 
              className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-800 block text-xl font-bold"
              htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Email de Registro" 
              className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="contraseña">contraseña</label>
            <input 
                id="contraseña" 
                type="password" 
                placeholder="Contraseña de Registro" 
                className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                value={password}
              onChange={e => setPassword(e.target.value)}
                />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="repitpassword">Repite Tu Contraseña</label>
            <input  
                id="repitpassword" 
                type="password" 
                placeholder="Repite Tu Contraseña" 
                className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
                />
          </div>

          <div>
            <input type="submit" value='Crear Tu Cuenta' 
              className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
          </div>

      </form>
      <nav className='lg:flex lg:justify-between'> 
            <Link className="block text-center my-5 text-slate-500 
                uppercase text-sm" to="/" >¿Ya una cuenta? Inicia Sesion</Link>
                
                <Link className="block text-center my-5 text-slate-500 
                uppercase text-sm" to="/olvide-password" >Olvide mi contraseña</Link>
          </nav> 
      

    </>
  )}

export default Registrar