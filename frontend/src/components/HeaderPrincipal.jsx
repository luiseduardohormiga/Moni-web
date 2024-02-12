import { Link, useLocation } from "react-router-dom"

const HeaderPrincipal = () => {
  //obtener ruta actual 
  const location = useLocation();
  const hideButtonRoutes = ['/login'];
  const omitirInicio = ['/', '/olvide-password'];
  const omitirRegistrar = ['/registrar'];

  const hideButton = hideButtonRoutes.includes(location.pathname);
  const botnInicio = omitirInicio.includes(location.pathname);
  const botonRegistro = omitirRegistrar.includes(location.pathname);
  return (
    <>
      <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
                <Link
                to='/'
                className=" text-3xl text-green-600 uppercase font-bold"
                >Moni-Web
                </Link>
            
            <div className="flex">
            {!botnInicio && (
              <div className="mr-2">
                <Link
                  to='/'
                  className="p-10 w-full py-3 text-green-600 uppercase font-bold rounded
                  hover:cursor-pointer hover:text-green-800 transition-color"
                >Inicio
                </Link>
              </div>
            )}
              {!hideButton && (
                <div className="mr-2">
                  <Link
                    to='login'
                    className="p-10 w-full py-3 text-green-600 uppercase font-bold rounded
                    hover:cursor-pointer hover:text-green-800 transition-color"
                    >Iniciar Sesion
                  </Link>
                </div>
              )}
              {!botonRegistro && (
                <div>
                  <Link
                    to='registrar'
                    className="p-10 w-full py-3 text-green-600 uppercase font-bold rounded
                    hover:cursor-pointer hover:text-green-800 transition-color"
                    >Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
      </header>
      
    </>
  )
}

export default HeaderPrincipal
