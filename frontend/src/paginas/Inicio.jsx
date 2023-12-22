import HeaderPrincipal from "../components/HeaderPrincipal"
import useConvocatorias from "../hooks/useConvocatorias"
import PreviewConvocatoria from "../components/PreviewConvocatoria"

const Inicio = () => {

  const { convocatorias } = useConvocatorias()
  //console.log(convocatorias) 

  return (
    <>
        <HeaderPrincipal/>
        <div className="bg-white">
            <h1 className="text-green-600 font-black text-6xl capitalize text-center mt-8">Bienbenido a Moni-web</h1>
        </div>
        <div className="bg-white shadow mt-10 rounded-lg ">
          {convocatorias.length ?
            convocatorias.map(convocatoria =>(
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

export default Inicio
