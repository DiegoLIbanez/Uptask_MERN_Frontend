import useProyectos from "../hooks/useProyectos"

const Colaborador = ({colaborador}) => {
    const {nombre, email} = colaborador

    const { hadleModalEliminarColaborador, modalEliminarColaborador } = useProyectos()

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className="text-xl text-gray-700 font-bold">{nombre}</p>
            <p className="text-xl text-gray-700 font-bold">{email}</p>
        </div>

        <div>
            <button
            type="button"
            className="bg-red-600 px-4 py-3 text-white rounded-lg font-bold uppercase text-sm"
            onClick={() => hadleModalEliminarColaborador(colaborador)}
            >
                Eliminar
            </button>
        </div>
    </div>
  )
}

export default Colaborador