import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
  const { auth } = useAuth()
  //console.log(auth)
    return (
      <>
        {auth.rol === 'admin' ? 
          <aside className="md:w-80 lg:w-96 px-5 py-10">
          <p className="text-xl font-bold">Bienvenido {auth.nombre}</p>
          
          <Link
          to='crear-convocatoria'
          className="bg-green-600 w-full p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
          >Nueva Convocatoria
          </Link>
          <Link
          to='/usuarios'
          className="bg-green-600 w-full p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
          >Usuarios
          </Link>
          <Link
          to='/convocatorias'
          className="bg-green-600 w-full p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
          >Convocatorias
          </Link>
          
        </aside>
          : auth.rol === 'Aprendiz' ? 
          <p className="text-xl font-bold">Bienvenido Aprendiz {auth.nombre}</p>
          : auth.rol === 'instuctor' ? 
          <p className="text-xl font-bold">Bienvenido instructor {auth.nombre}</p>
          :
          <p className="text-xl font-bold">Bienvenido psicolo@ {auth.nombre}</p>
        }
        
      </>
    )
  
  
}

export default Sidebar