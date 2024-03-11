import { Link } from "react-router-dom"

const PreviewUsuarios = ({ usuario }) => {
  const { _id, nombre, apellido, rol } = usuario

  return (
    <>
      <div className="border-b p-5 flex">
        <div className="flex-1">
          <p className=" capitalize ">
            {nombre} {apellido}
          </p>
          <h2 className="text-green-500 capitalize">{rol}</h2>
        </div>
        <div>
          <Link
            to={`${_id}`}
            className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold flex"
          >
            Ver informacion del usaurio
            <img className="w-7 ml-5" src="/public/ver.png" />
          </Link>
        </div>

      </div>
    </>
  )
}

export default PreviewUsuarios
