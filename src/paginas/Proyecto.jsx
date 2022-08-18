import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import ModalFormularioTareas from '../components/ModalFormularioTareas'
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Tarea from "../components/Tarea"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import io from 'socket.io-client'

let socket;

const Proyecto = () => {

    const params = useParams()
    const { obtenerProyecto,proyecto,cargando,handleModalTarea, alerta } = useProyectos()
  
    const admin = useAdmin()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])


  const {nombre} = proyecto
    



  return  (

    cargando ? <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-slate-300 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-300 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>:(
    <>   
      <div className="flex justify-between">
      <h1 className="font-black text-4xl">{nombre}</h1>

      {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>

              <Link to={`/proyectos/editar/${params.id}`} className='uppercase font-bold'>
                Ediar
              </Link>

          </div>
        )}


      </div>
      {admin && ( 
        <button 
            onClick={ handleModalTarea }
            type="button" className="text-sm px-5 py-3 w-full flex gap-2 md:w-auto rounded-lg eupercase 
            font-bold bg-sky-600 text-white text-center mt-5 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>

          Agregar Tareas
        </button>
      )}
      <p className="font-bold text-ml mt-10">Tareas Del Proyecto</p>

 

      
      <div className="bg-white shadow mt-10 rounded-lg">
          {proyecto.tareas?.length ? 
          proyecto.tareas?.map(tarea => (
            <Tarea key={tarea._id} tarea={tarea}/>
          )):
          <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>}
      </div>
          {admin && (
            <>
                <div className="flex items-center justify-between ">
                    <p className="font-bold text-ml mt-10">Colaboradores</p>
                    <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                      className='text-gray-400 uppercase hover:text-gray-900 font-bold'>
                      Añadir
                    </Link>
                </div>
          
          <div className="bg-white shadow mt-10 rounded-lg">
              {proyecto.colaboradores?.length ? 
              proyecto.colaboradores?.map(colaborador => (
                <Colaborador
                key={colaborador._id}
                colaborador={colaborador}
                />
              )):
              <p className="text-center my-5 p-10">No hay colaboradores es este proyecto</p>}
          </div>
      </>
        )}

      <ModalFormularioTareas/>
      <ModalEliminarTarea/>
      <ModalEliminarColaborador/>
      </>
    )
  )
  
}

export default Proyecto