import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const PreviewPostulado = ({postulado}) => {
  const { usuarios } = useAuth()
  const { Postulado, _id } = postulado

  // Buscar el usuario en la lista por ID
  const usuarioEncontrado = usuarios.find(usuario => usuario._id === Postulado);
  // Extraer el nombre del usuario si se encuentra
  const nombreDelPostulado = usuarioEncontrado ? usuarioEncontrado.nombre : 'Nombre no encontrado';

  return (
    <div className="border-b p-5 flex">
        <p className="flex-1">
          {nombreDelPostulado}
        </p>
      <Link to={`/postulaciones/${_id}`} className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
          >Calificar</Link>
    </div>
  )
}

export default PreviewPostulado
