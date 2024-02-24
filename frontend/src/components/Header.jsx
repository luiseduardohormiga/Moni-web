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
                    <span className="text-3xl uppercase font-bold" style={{ color: '#39A900' }}>
                        Moni-Web
                    </span>
                </div>
                <ul>
                    <li>
                        {!ocultarInicio && (
                            <Link
                                to='/convocatorias'
                                className="p-10 py-3 uppercase font-bold rounded hover:cursor-pointer transition-color"
                                style={{ color: '#39A900', transition: 'color 0.3s' }}
                                onMouseEnter={(e) => e.target.style.color = '#2F7B00'}
                                onMouseLeave={(e) => e.target.style.color = '#39A900'}
                            >Inicio
                            </Link>
                        )}
                        <button
                            type="button"
                            onClick={logout}
                            className="p-10 py-3 uppercase font-bold rounded hover:cursor-pointer transition-color"
                            style={{ color: '#39A900', transition: 'color 0.3s' }}
                            onMouseEnter={(e) => e.target.style.color = '#2F7B00'}
                            onMouseLeave={(e) => e.target.style.color = '#39A900'}
                        >Cerrar sesion
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header