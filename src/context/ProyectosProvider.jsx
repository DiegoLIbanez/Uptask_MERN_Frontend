import { useState, useEffect, createContext } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth";




const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {


    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)

    const navigate = useNavigate()
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await axios(`https://uptaskmernbackend-production-e28a.up.railway.app/api/proyectos`, config)
                setProyectos(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    },[auth])


    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 2000)
    }

    const submitProvider= async (proyecto) => {

        if(proyecto.id){
           await editarProyecto(proyecto)
        }else{
           await nuevoProyecto(proyecto)    
            
        }

    }
           


    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            const {data} = await axios.put(`https://uptaskmernbackend-production-e28a.up.railway.app/api/proyectos/${proyecto.id}` ,proyecto,config)

            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id
                === data._id ? data : proyectoState)    
                setProyectos(proyectosActualizados)

                setAlerta({
                    msg:'Proyecto Actualizado Correctamente',
                    error:false 
                })
    
                setTimeout(() => {
                    setAlerta({})
                    navigate('/proyectos')
                },1000)

        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {

        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.post(`https://uptaskmernbackend-production-e28a.up.railway.app/api/proyectos`, proyecto, config)
            setProyectos([...proyectos, data])
            
            setAlerta({
                msg:'Proyecto Creado Correctamente',
                error:false 
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            },1000)

        } catch (error) {
            console.log(error)
            }

    }



    const obtenerProyecto = async (id) => {
        setCargando(true)
        try {
            
            const token = localStorage.getItem('token')
                if(!token) return
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await axios(`https://uptaskmernbackend-production-e28a.up.railway.app/api/proyectos/${id}`, config)
                setProyecto(data)
                setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }finally{
            setCargando(false)
        }

        
    }


    const eliminarProyecto = async (id) => {
       try {
        
        const token = localStorage.getItem('token')
        if(!token) return
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.delete(`https://uptaskmernbackend-production-e28a.up.railway.app/api/proyectos/${id}`,config)

        const proyectosAcualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
        setProyectos(proyectosAcualizados)

        setAlerta({
            msg:data.msg,
            error:false 
        })

        setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
        },1000)
       } catch (error) {
        console.log(error)
       }

    }
 
    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async (tarea) => {


        if(tarea?.id){
           await editarTarea(tarea)
        }else{
           await crearTarea(tarea)
        }
         
    }

    const crearTarea = async tarea => {
        try {
            
            const token = localStorage.getItem('token')
        if(!token) return
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.post('https://uptaskmernbackend-production-e28a.up.railway.app/api/tareas',tarea ,config)
        console.log(data)

        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyecto.tareas, data]
        setProyecto(proyectoActualizado)
        setAlerta({})
        setModalFormularioTarea(false)

        //socket io 


        } catch (error) {
            console.log(error)
        }   
    }

    const editarTarea = async tarea => {
            try {
                
                const token = localStorage.getItem('token')
                if(!token) return
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await axios.put(`https://uptaskmernbackend-production-e28a.up.railway.app/api/tareas/${tarea.id}`, tarea, config)
                

                // todo: Actualizar el dom

                const proyectoActualizado = {...proyecto}
                proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => 
                    tareaState._id === data._id ? data : tareaState )
                setProyecto(proyectoActualizado)
                setAlerta({})
                setModalFormularioTarea(false)

            } catch (error) {
                
            }
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {
        try {

            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.delete(`https://uptaskmernbackend-production-e28a.up.railway.app/api/tareas/${tarea._id}`, config)
            setAlerta({
                msg: data.msg,
                error:false
            })


            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => 
                tareaState._id !== tarea._id)
            setProyecto(proyectoActualizado)
            setModalEliminarTarea(false)
            setTarea({})
            
            setTimeout( () => {
                setAlerta({})
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async email => {
        setCargando(true)
        try {

            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.post('https://uptaskmernbackend-production-e28a.up.railway.app/api/proyectos/colaboradores', {email}, config)
            
            setColaborador(data)
            setAlerta({})
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })

            setTimeout(() => {
                setAlerta({})
            },2000)
        }finally {
             setCargando(false)
        }
    }

    const agregarColaborador = async email => {
        try {
            
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.post(`https://uptaskmernbackend-production-e28a.up.railway.app/api/proyectos/colaboradores/${proyecto._id}`, email, config)
            
            setAlerta({
                msg: data.msg,
                error:false
            })

            setColaborador({})
            
            setTimeout(() => {
                setAlerta({})
            }, 3000);
       

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })

            setTimeout(() => {
                setAlerta({})
            },3000)
        }
    }

    const hadleModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
        
    }

    const eliminarColaborador = async () => {
        try {

            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.post(`https://uptaskmernbackend-production-e28a.up.railway.app/api/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
             
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter
            (colaboradorState => colaboradorState._id !== colaborador._id)

            setProyecto(proyectoActualizado)

            setAlerta({
                msg: data.msg,
                error:false
            })
            setColaborador({})
            setModalEliminarColaborador(false)

            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }


    const completarTarea = async (id) => {
        try {
            
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.post(`https://uptaskmernbackend-production-e28a.up.railway.app/api/tareas/estado/${id}`, {}, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => 
                tareaState._id === data._id ? data : tareaState)

            setProyecto(proyectoActualizado)
            setTarea({})
            setAlerta({})

        } catch (error) {
            console.log(error)
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }


    const cerrarSeccionProyectos = () => {
        setProyectos([])
        setProyecto({})
        setAlerta({})
    }


    return(
        <ProyectosContext.Provider value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProvider,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            modalFormularioTarea,
            handleModalTarea,
            submitTarea,
            handleModalEditarTarea,
            tarea,
            modalEliminarTarea,
            handleModalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            agregarColaborador,
            hadleModalEliminarColaborador,
            modalEliminarColaborador,
            eliminarColaborador,
            completarTarea,
            cerrarSeccionProyectos,
            handleBuscador,
            buscador

        }}>
                {children}
        </ProyectosContext.Provider>
    )
}

export {ProyectosProvider}
export default ProyectosContext;
