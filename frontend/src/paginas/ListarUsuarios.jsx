import PreviewUsuarios from "../components/PreviewUsuarios"
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { useState } from "react"

const ListarUsuarios = () => {
  const { usuarios } = useAuth()
  const [buscarUsuario, setBuscarUsuario] = useState("");

  // Función para manejar cambios en el campo de búsqueda
  const handleBuscarUsuario = (e) => {
    setBuscarUsuario(e.target.value);
  };

  // Filtrar los usuarios 
  const filtrarUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(buscarUsuario.toLowerCase())
  );

  return (
    <>
      <div className="flex gap-9">
        <h1 className="text-4xl p-3  font-black">Usuarios</h1>
        <div>
          <Link
            to='crear-usuario'
            className="p-3 text-white uppercase font-bold mt-5 text-cente rounded-lg flex"
            style={{ background: '#39A900', transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
            onMouseLeave={(e) => e.target.style.background = '#39A900'}
          >Nuevo usuario
            <img className="w-7 ml-5" src="/public/agregar-usuario.png" />
          </Link>
        </div>
        <div className="flex">
          <p className="font-bold mr-5 uppercase mt-5">Buscar Usuario</p>
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="border border-gray-300 p-3"
            value={buscarUsuario}
            onChange={handleBuscarUsuario}
          />
        </div>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg ">
        {filtrarUsuarios.length ?
          filtrarUsuarios.map(usuario => (
            <PreviewUsuarios
              key={usuario._id}
              usuario={usuario}
            />
          ))
          : <p> No hay usuarios </p>}
      </div>
    </>
  )
}

export default ListarUsuarios
