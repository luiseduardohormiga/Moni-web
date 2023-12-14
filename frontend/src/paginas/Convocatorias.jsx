import useConvocatorias from "../hooks/useConvocatorias"
import PreviewConvocatoria from "../components/PreviewConvocatoria"

const Convocatorias = () => {

  const { convocatorias } = useConvocatorias()
  //console.log(convocatorias)
  return (
    <>
      <h1 className="text-4xl font.black">Convocatorias</h1>
      
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

export default Convocatorias
