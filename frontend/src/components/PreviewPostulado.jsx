import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const PreviewPostulado = ({ postulado }) => {
  const { usuarios } = useAuth();
  const { Postulado, _id, promedioCalificaciones } = postulado;

  //primera letras del nombre en mayuscula
  function capitalizeName(name) {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const { auth } = useAuth()

  // Buscar el usuario en la lista por ID
  const usuarioEncontrado = usuarios.find(usuario => usuario._id === Postulado);
  // Extraer el nombre del usuario si se encuentra
  const nombreDelPostulado = usuarioEncontrado ? usuarioEncontrado.nombre : 'Nombre no encontrado';
  const apellidoDelPostulado = usuarioEncontrado ? usuarioEncontrado.apellido : 'Apellido no encontrado';

  return (
    <div className="border-b p-5 flex">
      <h1 className="flex-1 font-bold">
        {capitalizeName(nombreDelPostulado)} {capitalizeName(apellidoDelPostulado)}
      </h1>
      {auth.rol === 'admin' ?
        <p className="flex-1">
          Promedio del postulado: {promedioCalificaciones}
        </p>
        :
        ''
      }
      <Link to={`/postulaciones/${_id}`} className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold">
        Calificar
      </Link>
    </div>
  )
}

export default PreviewPostulado
