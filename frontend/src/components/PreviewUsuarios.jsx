import { Link } from "react-router-dom"

const PreviewUsuarios = ({usuario}) => {
    const { nombre, _id, apellido } = usuario
    
  return (
    <>
      <div className="border-b p-5 flex">
          <p className="flex-1">
              {nombre}

              <span className="text-sm text-gray-500 uppercase">{' '}</span>
          </p>
          
            <Link
           to={`${_id}`}  
            className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
            >VER</Link>
      </div>
    </>
  )
}

export default PreviewUsuarios
