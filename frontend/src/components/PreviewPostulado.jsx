import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const PreviewPostulado = ({postulado}) => {
  const { usuarios } = useAuth()
  const { Postulado, _id, promedioCalificaciones } = postulado


  // Buscar el usuario en la lista por ID
  const usuarioEncontrado = usuarios.find(usuario => usuario._id === Postulado);
  // Extraer el nombre del usuario si se encuentra
  const nombreDelPostulado = usuarioEncontrado ? usuarioEncontrado.nombre : 'Nombre no encontrado';
  const apellidoDelPostulado = usuarioEncontrado ? usuarioEncontrado.apellido : 'Apellido no encontrado';

  return (
    <div className="border-b p-5 flex">
        <h1 className="flex-1 font-bold">
          {nombreDelPostulado} {apellidoDelPostulado}
        </h1>
        <p className="flex-1">
          Promedio del postulado: {promedioCalificaciones}
        </p>
      <Link to={`/postulaciones/${_id}`} className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
          >Calificar</Link>
    </div>
  )
}

export default PreviewPostulado
