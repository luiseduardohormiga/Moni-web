import { Link } from "react-router-dom"

const PreviewUsuarios = ({usuario}) => {
    const { _id, nombre, apellido, rol } = usuario
    
  return (
    <>
      <div className="border-b p-5 flex">
          <p className="flex-1">
              {nombre} {apellido}
              <span className="text-sm text-gray-500 uppercase">{' '}</span>
              <h2 className="text-green-500">{rol}</h2>
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
