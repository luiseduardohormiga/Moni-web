import { Link } from "react-router-dom";

const PreviewConvocatoriaInicio = ({convocatoria}) => {

    const { titulo, _id, descripcion } = convocatoria

  return (
        <div className="flex bg-gray-200 shadow rounded-lg p-10 gap-2 justify-center mt-10 mr-10">
            <div>
                <img src="/public/logo_sena.png" alt="logo sena" />
            </div>
            <div className="ml-20">
                <h1 className="uppercase font-black text-3xl text-center">{titulo}</h1>
                <p className="text-center">
                    <span className="text-sm uppercase">{''}{descripcion}</span>
                </p>
                <Link
                    to={'/login'} 
                    className="text-green-700 hover:text-gray-600 uppercase font-bold"
                    >Inicia Sesion para poder Postularce
                </Link>
            </div>
        </div>
  )
}

export default PreviewConvocatoriaInicio
