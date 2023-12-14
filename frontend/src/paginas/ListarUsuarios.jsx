import PreviewUsuarios from "../components/PreviewUsuarios"
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"

const ListarUsuarios = () => {
    const { usuarios } = useAuth()
    //console.log(usuarios)
  return (
    <>
      <h1 className="text-4xl font.black">Usuarios</h1>
      <Link
          to='crear-usuario'
          className="bg-green-600 w-full p-3 text-white uppercase font-bold block mt-5 text-cente rounded-lg"
          >Nuevo usuario
      </Link>
      
      <div className="bg-white shadow mt-10 rounded-lg ">
        {usuarios.length ?
          usuarios.map(usuario =>(
            <PreviewUsuarios 
              key={usuario._id}
              usuario={usuario}
            />
          ))
        : <p> No Ususarios </p>}
      </div>
    </>
  )
}

export default ListarUsuarios
