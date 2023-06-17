import { useState } from "react"
import { Link } from "react-router-dom" 
import Alerta from "../components/Alerta"
import axios from 'axios'
const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async event => {
    event.preventDefault();

   if(email === '' || email.length < 6){
      setAlerta({
        msg: 'El Email es obligatorio',
        error:true,
      })
      return
   }

   try { 
          //TODO: Mover hacia un cliente axios

          const {data} = await axios.post(`https://uptaskmernbackend-production-0971.up.railway.app/api/usuarios/olvide-password`,{email})
          setAlerta({
            msg:data.msg,
            error:false
          })
   } catch (error) {
    setAlerta({
       msg:error.response.data.msg,
       error:true
    })
    
      
   }

  }

  const {msg} = alerta
  return (
    <>
      <h1 className="text-sky-900 font-black text-6xl">Recupera Tu Contraseña </h1>
          {msg && <Alerta alerta={alerta}/>}
      <form onSubmit={handleSubmit}
          className="my-10 bg:white shadow p-10 shadow">

          <div className="my-5">
            <label className="uppercase text-gray-800 block text-xl font-bold"
              htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Email de Registro" 
              className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
              value={email}
              onChange={e => setEmail(e.target.value)}/>
          </div>


          <div>
            <input type="submit" value='Recuperar Ahora' 
              className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
          </div>
      </form>
      <nav className='lg:flex lg:justify-between'> 
      
      <Link className="block text-center my-5 text-slate-500 
                uppercase text-sm" to="/" >¿Ya una cuenta? Inicia Sesion</Link>

      <Link className="block text-center my-5 text-slate-500 
                uppercase text-sm" to="/registrar" >¿No tienes una cuenta? Registrate</Link>
                
      </nav> 
    </>
  )
}

export default OlvidePassword