import HeaderPrincipal from "../components/HeaderPrincipal"
import useConvocatorias from "../hooks/useConvocatorias"
import PreviewConvocatoriaInicio from "../components/PreviewConvocatoriaInicio"
import Footer from "../components/Footer"
import { useState } from "react"

const Inicio = () => {
  const [busqueda, setBusqueda] = useState('');
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
       <HeaderPrincipal/>
        <p className="text-green-600 font-black text-6xl capitalize text-center mt-8">Postulate a las nuevas convocatorias </p>
        <div className="mx-auto p-5 md:flex md:justify-center mt-10">
          <p className="font-bold mr-5 uppercase mt-3">Buscar</p>
          <input
            type="text"
            placeholder="Buscar convocatorias..."
            value={busqueda} 
            onChange={handleBusquedaChange}
            className="border border-gray-300 p-3"
          />  
        </div>
          <div className="bg-white container mx-auto p-5 md:flex md:justify-center mt-10">
              <div className="grid grid-cols-1 mx-auto p-5 md:justify-center md:grid-cols-2">
                  {convocatoriasFiltradas.length ?
                    convocatoriasFiltradas.map(convocatoria =>(
                      <PreviewConvocatoriaInicio
                        key={convocatoria._id}
                        convocatoria={convocatoria}
                      />
                    )) 
                    : <p className="text-center text-gray-600 uppercase p-5">No hay Convocatorias</p>}
                    </div>
                </div>
              <Footer/>
          </>   
        )
      }
      

export default Inicio
