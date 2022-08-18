import useProyectos from "../hooks/useProyectos"
import PriviewProyecto from "../components/PriviewProyecto"
import Alerta from "../components/Alerta"


const Proyectos = () => {
  const {proyectos, alerta} = useProyectos()


  const {msg} = alerta

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      {msg && <Alerta alerta={alerta}/>}
      <div className="bg-white shadow mt-10 rounded-lg ">
        {proyectos.length ? proyectos.map((proyecto) => (
            <PriviewProyecto key={proyecto._id}  proyecto={proyecto}/>
        )) : <p className=" text-center p-5 text-gray-600
            uppercase">no hay proyectos</p>}
      </div>
    </>
  )
}

export default Proyectos