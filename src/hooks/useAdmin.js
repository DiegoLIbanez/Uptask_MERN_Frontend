
import useProyectos from "./useProyectos";
import useAuth from "./useAuth";

// si el usuario es administrador 
const useAdmin = () => {
    const { proyecto } = useProyectos()
    const {auth} = useAuth()

    return proyecto.creador === auth._id
} 


export default useAdmin;