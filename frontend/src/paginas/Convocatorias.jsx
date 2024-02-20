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
      {auth.rol === 'admin'?
      <div className="mt-10 bg-green-600 rounded-lg flex p-3">
        <Link
          to='crear-convocatoria'
          className=" p-3 text-white uppercase font-bold"
          >Nueva Convocatoria
        </Link>
        
        <img className="w-10 h-10 md:mt-7" src="/public/mas2.png"/>
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
            className="border border-gray-300 p-3 lg:mt-5"
          /> 
      </div>
    </div>

      
      
    <div className="bg-white shadow mt-10 rounded-lg">
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
