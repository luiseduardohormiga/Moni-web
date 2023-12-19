import useConvocatorias from "../hooks/useConvocatorias"
import PreviewConvocatoria from "../components/PreviewConvocatoria"
import { Link } from "react-router-dom"

const Convocatorias = () => {

  const { convocatorias } = useConvocatorias()
  //console.log(convocatorias)
  return (
    <>
    <div className="flex gap-9">
      <h1 className="text-4xl p-3 font-black ">Convocatorias</h1>
      <Link
          to='crear-convocatoria'
          className="bg-green-600 p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
          >Nueva Convocatoria
      </Link>
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

export default Convocatorias
