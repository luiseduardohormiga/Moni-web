import { Link } from "react-router-dom"

const HeaderPrincipal = () => {
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
              <div className="mr-2">
                <Link
                to='login'
                className="bg-green-600 p-20 mb-5 w-full py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-green-800 transition-color"
                >Iniciar Sesion
                </Link>
              </div>
              <div>
                <Link
                to='registrar'
                className="bg-green-600 p-20 mb-5 w-full py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-green-800 transition-color"
                >Registrarse
                </Link>
              </div>
            </div>
          </div>
      </header>
    </>
  )
}

export default HeaderPrincipal
