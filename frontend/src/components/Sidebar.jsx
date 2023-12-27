import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
  const { auth } = useAuth()

  const location = useLocation();
  const ocultarBotonConvocatorias = ['/convocatorias'];
  const ocultarBotonUsuarios = ['/usuarios'];
  
  const ocultarConvocatorias = ocultarBotonConvocatorias.includes(location.pathname);
  const ocultarUsuarios = ocultarBotonUsuarios.includes(location.pathname);

    return (
      <>
        {auth.rol === 'admin' ? 
          <aside className="md:w-80 lg:w-96 px-5 py-10">
          <p className="text-xl font-bold">Bienvenido {auth.nombre}</p>
          {!ocultarUsuarios && (
             <Link
              to='/usuarios'
              className="bg-green-600 w-full p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
              >Usuarios
             </Link>
          )}
          {!ocultarConvocatorias && (
            <Link
              to='/convocatorias'
              className="bg-green-600 w-full p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
              >Convocatorias
            </Link>
          )}
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