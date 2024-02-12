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
          <div>
            <Link
              to={`${_id}`}  
              className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold flex"
              >
                ver
              <img className="w-7 ml-5" src="/public/ver.png"/>
            </Link>
          </div>
            
      </div>
    </>
  )
}

export default PreviewUsuarios
