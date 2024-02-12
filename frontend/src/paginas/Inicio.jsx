import HeaderPrincipal from "../components/HeaderPrincipal"
import useConvocatorias from "../hooks/useConvocatorias"
import PreviewConvocatoriaInicio from "../components/PreviewConvocatoriaInicio"
import Footer from "../components/Footer"

const Inicio = () => {

  const { convocatorias } = useConvocatorias()
  //console.log(convocatorias) 

  return (
    <>
        <HeaderPrincipal/>
        
        <p className="text-green-600 font-black text-6xl capitalize text-center mt-8">Postulate a las nuevas convocatorias </p>
          
        <div className="bg-white container mx-auto p-5 md:flex md:justify-center mt-10">
            <div className="grid grid-cols-1 mx-auto p-5 md:justify-center md:grid-cols-2">
                {convocatorias.length ?
                  convocatorias.map(convocatoria =>(
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
