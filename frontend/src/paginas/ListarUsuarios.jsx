import PreviewUsuarios from "../components/PreviewUsuarios"
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const ListarUsuarios = () => {
  const [buscarUsuario, setBuscarUsuario] = useState("");
  const { usuarios, obtenerUsuarios, cargandoU } = useAuth()

  useEffect(() => {
    obtenerUsuarios();
  }, []);
 
  // Función para manejar cambios en el campo de búsqueda
  const handleBuscarUsuario = (e) => {
    setBuscarUsuario(e.target.value);
  };

  const filtrarUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(buscarUsuario.toLowerCase())
  );
  if (cargandoU) return 'cargando...'
  return (
    <>
      <div className="p-5 shadow md:flex md:items-center md:justify-between sm:flex-col">

          <div className="md:flex md:items-center">
            <div className="mr-10 mb-7">          
            <p className="font-bold mr-5 uppercase mt-5">Buscar Usuario</p>
            <input
            type="text"
            placeholder="Buscar usuario..."
            className="border border-gray-300 p-3 rounded-lg"
            value={buscarUsuario}
            onChange={handleBuscarUsuario}
          />
            </div>
            <div>
              <Link
                to='crear-usuario'
                className="w-full p-3 flex text-white uppercase font-bold text-center rounded-lg md:w-auto"
                style={{ background: '#39A900', transition: 'background-color 0.3s' }}
                onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
                onMouseLeave={(e) => e.target.style.background = '#39A900'}
              >Nuevo usuario
                <img className="w-7 h-700 rounded-lg"  src="/public/agregar-usuario.png" />
              </Link>
            </div>
          </div>
      </div>

      
      <h1 className="text-4xl p-3 mt-7 font-black text-center">Usuarios</h1>

      <div className="bg-white shadow mt-3 rounded-lg lg:w-2/3 mx-auto">
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
