import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';

const PreviewPostulado = ({postulado}) => {
    const { Postulado, _id } = postulado
  return (
    <div className="border-b p-5 flex">
        <p className="flex-1">
          {Postulado}
        </p>
      <Link to={`/postulaciones/${_id}`} className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
          >Calificar</Link>
    </div>
  )
}

export default PreviewPostulado
