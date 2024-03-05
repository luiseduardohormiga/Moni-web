import { Link } from "react-router-dom"

const PreviewUsuarios = ({ usuario }) => {
  const { _id, nombre, apellido, rol } = usuario
  //primera letras del nombre en mayuscula
  function capitalizeName(name) {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  return (
    <>
      <div className="border-b p-5 flex">
        <p className="flex-1">
          {capitalizeName(nombre)} {capitalizeName(apellido)}
          <span className="text-sm text-gray-500 uppercase">{' '}</span>
          <h2 className="text-green-500">{capitalizeName(rol)}</h2>
        </p>
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
