import { useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"
import { useParams } from "react-router-dom"

const FormularioProyecto =  () => {

  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')

  const params = useParams()
  const {mostrarAlerta,alerta,submitProvider,proyecto} = useProyectos();

  useEffect(() => {
    if(params.id ){
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
      setCliente(proyecto.cliente)

     
    
    }else{
      console.log('Nuevo Proyecto...')
    }

  }, [params])
  


  const handleSubmit = async (event) => {
        event.preventDefault()

        if([nombre, descripcion,fechaEntrega,cliente].includes('')){
          mostrarAlerta({
            msg: 'Todos los campos son obligatorios',
            error:true
          })
          return
        }

        //Pasar los datos hacia el provider
       await submitProvider({id, nombre, descripcion, fechaEntrega, cliente})

       setId(null)
       setNombre('')
       setDescripcion('')
       setFechaEntrega('')
       setCliente('')

  }
  
  const {msg} = alerta

  return (
    <form  onSubmit={handleSubmit}
          className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">

        {msg && <Alerta alerta={alerta}/>}

        <div className="mb-5">

            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">
                Nombre Proyecto 
            </label>
            <input 
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  placeholder="Nombre Proyecto" 
                  type="text" 
                  id="nombre"  
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="descripcion">
            Descripcion
            </label>
            <textarea
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  placeholder="Descripcion del Proyecto" 
                  id="descripcion"  
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  />
        </div>
        
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="fecha-entrega">
            Fecha Entrega
            </label>
            <input
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  placeholder="Descripcion del Proyecto" 
                  type='date'
                  id="fecha-entrega"  
                  value={fechaEntrega}
                  onChange={e => setFechaEntrega(e.target.value)}
                  />
        </div>

        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cliente">
             Nombre Cliente
            </label>
            <input
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  placeholder="Nombre Cliente" 
                  id="cliente"  
                  value={cliente}
                  onChange={e => setCliente(e.target.value)}
                  />
        </div>
        <input 
            type="submit" 
            value={id ? 'Actualizar Proyecto' : 'Crear Proyecto '}
            className='bg-sky-600 w-full p-3 font-bold text-white uppercase text-center rounded cursor-pointer
            hover:bg-sky-700 transition-colors'/>

    </form>
  )
}

export default FormularioProyecto