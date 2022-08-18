import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda'
const Headers = () => {

  const {cerrarSeccionProyectos, handleBuscador} = useProyectos()
  const {cerrarSeccionAuth} = useAuth()


  const handleCerrarSeccion = () => {
    cerrarSeccionProyectos()
    cerrarSeccionAuth()
    localStorage.removeItem('token')
  }



  return (
    <header className='px-4 py-5 bg-white border-b shadow'>


      <div className='md:flex md:justify-between'>
          <h2 className='text-4xl text-sky-600  font-black text-center mb-5 md:mb-0'>
            UpTask
          </h2>

          <div className='flex flex-col md:flex-row items-center gap-4'>
              <button className='font-bold uppercase' onClick={handleBuscador}>
                  Buscar Proyecto
              </button>


              <Link to='/proyectos' className='font-bold uppercase'>Proyectos</Link>
              <button type='button' className='text-white hover:bg-sky-700 bg-sky-600 p-3 rounded-md
                  uppercase font-bold'
                  onClick={handleCerrarSeccion}>Cerrar Sesión</button>

                <Busqueda/>
            </div>
        </div>
    </header>
  )
}

export default Headers