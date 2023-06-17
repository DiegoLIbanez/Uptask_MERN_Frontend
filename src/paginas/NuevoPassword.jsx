import { useState, useEffect } from "react"
import {Link, useParams} from 'react-router-dom'
import axios from "axios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const {token} = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        //TODO:Mover hacia un cliente axios
          await axios(`https://uptaskmernbackend-production-0971.up.railway.app/api/usuarios/olvide-password/${token}`)
          setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }    
      
  }
  comprobarToken()
}, [])

const handleSubmit= async (event) => {
    event.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error:true
      })
      return
    }
    try {
        const url = `https://uptaskmernbackend-production-0971.up.railway.app/api/usuarios/olvide-password/${token}`
        const {data} = await axios.post(url,{password})
        setAlerta({
          msg:data.msg,
          error:false
        })
        setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
    
}
  
const {msg}= alerta
  return (
    <>
      <h1 className="text-sky-900 font-black text-6xl ">Restablece Tu Password</h1>
        {msg && <Alerta alerta={alerta}/>}
      {tokenValido && (
              <form
              onSubmit={handleSubmit}
              className="my-10 bg:white shadow p-10 shadow">

              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="password">Nueva Contraseña</label>
                <input 
                    id="password" 
                    type="password" 
                    placeholder="Nueva Contraseña" 
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
              </div>

              <div>
                <input type="submit" value='Guardar Nueva Contraseña' 
                  className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
                    hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
              </div>

          </form>
      )}
      {passwordModificado && (
        <Link className="block text-center my-5 text-slate-500 
        uppercase text-sm" to="/" >Inicia Sesion</Link>
      )}
    </>
  )
}

export default NuevoPassword