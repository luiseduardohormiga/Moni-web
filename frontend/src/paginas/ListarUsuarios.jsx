import PreviewUsuarios from "../components/PreviewUsuarios"
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { useState } from "react"

const ListarUsuarios = () => {
  const [busqueda, setBusqueda] = useState('');
  const { usuarios } = useAuth()
    //console.log(usuarios)

    const handleBusquedaChange = (event) => {
      setBusqueda(event.target.value);
    };
  
    const usuariosFiltrados = usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <>
    <div className="flex gap-9">
      <h1 className="text-4xl p-3  font-black">Usuarios</h1>
      <div>
        <Link
            to='crear-usuario'
            className="bg-green-600 p-3 text-white uppercase font-bold mt-5 text-cente rounded-lg flex"
            >Nuevo usuario
            <img className="w-7 ml-5" src="/public/agregar-usuario.png"/>
        </Link>
      </div>
      <div className="flex">
      <p className="font-bold mr-5 uppercase mt-5">Buscar Usuario</p>
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={busqueda} 
            onChange={handleBusquedaChange}
            className="border border-gray-300 p-3"
          /> 
      </div>
    </div>
      
    <div className="bg-white shadow mt-10 rounded-lg ">
        {usuariosFiltrados.length ?
          usuariosFiltrados.map(usuario =>(
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
