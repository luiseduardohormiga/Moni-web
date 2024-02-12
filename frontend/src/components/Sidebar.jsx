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
          <p className="text-xl font-bold">Usuario: {auth.nombre}</p>
          <p className="text-xl font-bold">Rol: {auth.rol}</p>
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
          <aside className="md:w-80 lg:w-96 px-5 py-10">
            <div>
              <p className="text-xl font-bold">Usuario: {auth.nombre}</p>
              <p className="text-xl font-bold">Rol: {auth.rol}</p>
            </div>
          </aside>
          : auth.rol === 'instuctor' ? 
          <aside className="md:w-80 lg:w-96 px-5 py-10">
            <div>
              <p className="text-xl font-bold">Usuario: {auth.nombre}</p>
              <p className="text-xl font-bold">Rol: {auth.rol}</p>
            </div>
          </aside>
          :
          <aside className="md:w-80 lg:w-96 px-5 py-10">
            <div>
              <p className="text-xl font-bold">Usuario: {auth.nombre}</p>
              <p className="text-xl font-bold">Rol: {auth.rol}</p>
            </div>
          </aside>
        }
        
      </>
    )
  
  
}

export default Sidebar