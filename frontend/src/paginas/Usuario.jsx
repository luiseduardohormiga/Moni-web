import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Usuario = () => {
  const params = useParams()

  const { obtenerUsuario, usuario, cargando } = useAuth()

  //primera letras del nombre en mayuscula
  function capitalizeName(name) {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  useEffect(() => {
    obtenerUsuario(params.id)
  }, [])
  const { nombre, apellido, tipo_documento, N_documento, P_formacion, ficha, email, rol } = usuario
  if (cargando) return 'Cargando...'
  return (
    <div className="mx-auto lg:w-2/3">
      <div className='items-centertext-black flex justify-between '>
        <h1 className="text-xl font-bold">DATOS DEL USUARIO</h1>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          <Link
            to={`/usuarios/editar/${params.id}`}
            className='uppercase font-bold'
          >Editar
          </Link>
        </div>
      </div>
      <div >
        <h2 className="border">Nombre: {capitalizeName(nombre)}</h2>
        <h2 className="border">Apellido: {capitalizeName(apellido)}</h2>
        <h2 className="border">TIPO DE DOCUMENTO: {capitalizeName(tipo_documento)}</h2>
        <h2 className="border">NUMERO DE DOCUMENTO: {capitalizeName(N_documento)}</h2>
        <h2 className="border">PROGRAMA DE FORMACION: {capitalizeName(P_formacion)}</h2>
        <h2 className="border"> FICHA:{capitalizeName(ficha)}</h2>
        <h2 className="border">CORREO: {capitalizeName(email)}</h2>
        <h2 className="border">ROL DE USUARIO: {capitalizeName(rol)}</h2>

      </div>
    </div>


  )
}

export default Usuario
