import { Link } from "react-router-dom";

const PreviewConvocatoriaInicio = ({convocatoria}) => {

    const { titulo, _id, descripcion, img } = convocatoria

  return (
        <div className="bg-gray-200 shadow rounded-lg p-10 justify-center mt-10 mr-10">
            <div className="ml-10">
                {convocatoria.img && <img src={img.url} alt="imagen" style={{ width: '85%', height: 'auto' }} />}
            </div>
            <div className="ml-10 mt-10">
                <h1 className="uppercase font-black text-2xl text-center">{titulo}</h1>
                <p className="mt-7 mb-7">
                    <span className="text-sm">{''}{descripcion}</span>
                </p>
                <h2 className="text-center">
                    <Link
                        to={'/login'} 
                        className="text-green-700 hover:text-gray-600 uppercase font-bold "
                        >Inicia Sesion para poder Postularce
                    </Link>
                </h2>
            </div>
        </div>
  )
}

export default PreviewConvocatoriaInicio
