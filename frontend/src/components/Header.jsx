import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const { logout } = useAuth();
    const location = useLocation();
    const ocultarBotonInicio = ['/convocatorias'];
    const ocultarInicio = ocultarBotonInicio.includes(location.pathname);

  return (
    <>
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-green-600 font-black text-center">
            <Link
                to='/convocatorias'
                className=" text-3xl text-green-600 uppercase font-bold"
                >Moni-Web
                </Link>
            </h2>
            
            <div className="flex items-center gap-4">
            {!ocultarInicio && (
                <Link
                to='/convocatorias'
                className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold"
                >Inicio
                </Link>
            )}
                <button
                    type="button"
                    onClick={logout}
                    className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold"
                >Cerrar sesion</button>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header