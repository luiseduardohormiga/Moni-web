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
              className="w-full p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
              style={{ background: '#39A900', transition: 'background-color 0.3s' }}
              onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
              onMouseLeave={(e) => e.target.style.background = '#39A900'}
            >Usuarios
            </Link>
          )}
          {!ocultarConvocatorias && (
            <Link
              to='/convocatorias'
              className="w-full p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
              style={{ background: '#39A900', transition: 'background-color 0.3s' }}
              onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
              onMouseLeave={(e) => e.target.style.background = '#39A900'}
            >Convocatorias
            </Link>
          )}
        </aside>
        : 
        ''
      }

    </>
  )


}

export default Sidebar