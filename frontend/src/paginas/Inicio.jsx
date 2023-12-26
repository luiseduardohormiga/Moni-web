import HeaderPrincipal from "../components/HeaderPrincipal"
import useConvocatorias from "../hooks/useConvocatorias"
import PreviewConvocatoriaInicio from "../components/PreviewConvocatoriaInicio"

const Inicio = () => {

  const { convocatorias } = useConvocatorias()
  //console.log(convocatorias) 

  return (
    <>
        <HeaderPrincipal/>
        <div className="bg-white container mx-auto p-5 md:flex md:justify-center mt-10">
          <div>
          <h1 className="text-green-600 font-black text-6xl capitalize text-center mt-8">Bienbenido a Moni-web</h1>
          </div>
            <div className="container mx-auto p-5 md:flex md:justify-center">
              {convocatorias.length ?
                convocatorias.map(convocatoria =>(
                  <PreviewConvocatoriaInicio
                    key={convocatoria._id}
                    convocatoria={convocatoria}
                  />
                )) 
              : <p className="text-center text-gray-600 uppercase p-5">No hay Convocatorias </p>}
            </div>
        </div>
    </>   
  )
}

export default Inicio
