import useConvocatorias from "../hooks/useConvocatorias"
import PreviewConvocatoria from "../components/PreviewConvocatoria"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react"

const Convocatorias = () => {
  const [busqueda, setBusqueda] = useState('');
  const { auth } = useAuth()
  const { convocatorias } = useConvocatorias()

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const convocatoriasFiltradas = convocatorias.filter(convocatoria =>
    convocatoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className="p-5 shadow md:flex md:items-center md:justify-between sm:flex-col">
        <div className="md:flex md:items-center">
          <div className="mr-10 mb-7">
            <p className="font-bold uppercase">Buscar Convocatoria</p>
            <input
              type="text"
              placeholder="Buscar convocatorias..."
              value={busqueda}
              onChange={handleBusquedaChange}
              className="border border-gray-300 p-3 rounded-lg"
            />
          </div>
          <div>
            {auth.rol === 'admin' && (
              <Link
                to='crear-convocatoria'
                className="w-full p-3 flex text-white uppercase font-bold text-center rounded-lg md:w-auto"
                style={{ background: '#39A900', transition: 'background-color 0.3s' }}
                onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
                onMouseLeave={(e) => e.target.style.background = '#39A900'}
              >
                Nueva Convocatoria
                <img className="h-10 ml-5 hidden sm:block" src="/public/mas2.png" alt="Agregar icono" />
              </Link>
            )}
          </div>
        </div>
      </div>


      <h1 className="text-4xl mt-7 p-3 font-black text-center">Convocatorias</h1>

      <div className="bg-white shadow mt-3 rounded-lg p-10 mx-auto">
        {convocatoriasFiltradas.length ?
          convocatoriasFiltradas.map(convocatoria => (
            <PreviewConvocatoria
              key={convocatoria._id}
              convocatoria={convocatoria}
            />
          ))
          : <p className="text-center text-gray-600 uppercase p-5">No hay Convocatorias </p>}
      </div>
    </>
  )
}

export default Convocatorias
