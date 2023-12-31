import { Link } from "react-router-dom"

const PreviewPostulado = ({postulado}) => {
    const { archivoPDF, _id } = postulado
  return (
    <div className="border-b p-5 flex">
        <p className="flex-1">
              {archivoPDF}
          </p>
      <Link to={`${_id}`} className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
          >Calificar</Link>
    </div>
  )
}

export default PreviewPostulado
