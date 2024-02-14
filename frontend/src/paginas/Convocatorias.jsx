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
    <div className="flex gap-9">
      <h1 className="text-4xl p-3 font-black ">Convocatorias</h1>
      {auth.rol === 'admin'?
      <div>
        <Link
          to='crear-convocatoria'
          className="bg-green-600 p-3 text-white uppercase font-bold mt-5 text-cente rounded-lg flex"
          >Nueva Convocatoria
        <img className="w-7 ml-5" src="/public/mas2.png"/>
        </Link>
      </div>
      :
      ''
      }
      <div className="flex">
      <p className="font-bold mr-5 uppercase mt-5">Buscar Convocatoria</p>
          <input
            type="text"
            placeholder="Buscar convocatorias..."
            value={busqueda} 
            onChange={handleBusquedaChange}
            className="border border-gray-300 p-3"
          /> 
      </div>
    </div>

      
      
    <div className="bg-white shadow mt-10 rounded-lg ">
        {convocatoriasFiltradas.length ?
          convocatoriasFiltradas.map(convocatoria =>(
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
