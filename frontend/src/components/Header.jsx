import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const { logout } = useAuth();
    const location = useLocation();
    const ocultarBotonInicio = ['/convocatorias'];
    const ocultarInicio = ocultarBotonInicio.includes(location.pathname);

  return (
    <>
    <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
        <div>
            <span className="text-3xl text-green-600 uppercase font-bold">
                Moni-Web
            </span>
        </div>
        <ul>
            <li>
                <a>
                    {!ocultarInicio && (
                    <Link
                        to='/convocatorias'
                        className="p-10 py-3 text-green-600 uppercase font-bold rounded
                        hover:cursor-pointer hover:text-green-800 transition-color"
                        >Inicio
                    </Link>
                )}
                </a>
                <a>
                    <button
                        type="button"
                        onClick={logout}
                        className="p-10 py-3 text-green-600 uppercase font-bold rounded
                        hover:cursor-pointer hover:text-green-800 transition-color"
                        >Cerrar sesion
                    </button>
                </a>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Header