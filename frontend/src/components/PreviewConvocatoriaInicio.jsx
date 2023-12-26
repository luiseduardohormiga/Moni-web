import { Link } from "react-router-dom";

const PreviewConvocatoriaInicio = ({convocatoria}) => {

    const { titulo, _id, descripcion } = convocatoria

  return (
        <div className="my-10 bg-white shadow rounded-lg p-10">
            <img src="./img/logo_sena.pbg" alt="" />
            <h1 className="uppercase font-black text-3xl text-center">{titulo}</h1>
            <p className="text-center">
                <span className="text-sm uppercase">{''}{descripcion}</span>
            </p>
            <Link
                to={'/login'} 
                className="text-green-500 hover:text-green-700 uppercase text-sm font-bold"
                >Inicia Sesion para poder Postularce
            </Link>
        </div>
  )
}

export default PreviewConvocatoriaInicio
