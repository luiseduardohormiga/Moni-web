import useConvocatorias from "../hooks/useConvocatorias"
import PreviewConvocatoria from "../components/PreviewConvocatoria"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react"

const Convocatorias = () => {
  const [busqueda, setBusqueda] = useState('');
  const { auth } = useAuth()
  const { convocatorias } = useConvocatorias()
  //console.log(convocatorias)

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const convocatoriasFiltradas = convocatorias.filter(convocatoria =>
    convocatoria.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className="md:flex gap-6">
        <h1 className="text-4xl p-3 font-black md:mt-10 ">Convocatorias</h1>
        {auth.rol === 'admin' ?
          <div className=" rounded-lg flex p-3">
            <Link
              to='crear-convocatoria'
              className="w-full p-3 flex text-white uppercase font-bold mt-5 text-cente rounded-lg"
              style={{ background: '#39A900', transition: 'background-color 0.3s' }}
              onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
              onMouseLeave={(e) => e.target.style.background = '#39A900'}
            >Nueva Convocatoria
            <img className="h-10 ml-5" src="/public/mas2.png" />
            </Link>
          </div>
          :
          ''
        }
        <div className="md:flex mt-10">
          <p className="font-bold mr-5 uppercase mt-5">Buscar Convocatoria</p>
          <input
            type="text"
            placeholder="Buscar convocatorias..."
            value={busqueda}
            onChange={handleBusquedaChange}
            className="border border-gray-300 p-3 lg:mt-5 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg p-10 lg:w-2/3 mx-auto">
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
