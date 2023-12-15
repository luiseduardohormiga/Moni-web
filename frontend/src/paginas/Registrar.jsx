import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

const TIPO_DOCUMENTO = ['TI', 'CC', 'CE']

const Registrar = () => {
  const [ nombre, setNombre ] = useState('')
  const [ apellido, setApellido ] = useState('')
  const [ tipo_documento, setTipo_documento ] = useState('')
  const [ N_documento, setN_documento ] = useState('')
  const [ P_formacion, setP_formacion ] = useState('')
  const [ ficha, setFicha ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})

  const navigate = useNavigate()

  const params = useParams()

  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre, apellido, tipo_documento, N_documento, P_formacion, ficha, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: "todos los campos son obligatorios",
        error: true
      })
      return
    }
    if (password !== repetirPassword) {
      setAlerta({
        msg: "las contraseñas no coinciden",
        error: true
      })
      return
    }
    if (password.length < 6) {
      setAlerta({
        msg: "la contraseña es muy corta, minimo 6 caracteres",
        error: true
      })
      return
    }
    setAlerta({})

    //crear usuario
    try {
      const { data } = await clienteAxios.post(`/usuarios`,
      {nombre, apellido, tipo_documento, N_documento, P_formacion, ficha, email, password, repetirPassword})
        setAlerta({
          msg: data.msg,
          error: false
        }) 
        //redireccion
        setTimeout(() => {
          setAlerta({})
          navigate('/login')
        }, 2000);

      setNombre('')
      setApellido('')
      setTipo_documento('')
      setN_documento('')
      setP_formacion('')
      setFicha('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })  
    }
  }
  const { msg } = alerta

  return (
    <>
    <form 
    className="my-7 bg-white shadow rounded-lg p-10"
    onSubmit={handleSubmit}
     >
     <h1 className="text-green-600 font-black text-6xl capitalize text-center mb-10">Registrate</h1>
      {msg && <Alerta alerta={alerta}/>}
      <div className="flex">
      <div className="justify-center">
          <div className="p-2">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
            <input 
                id="nombre"
                type="text" 
                placeholder="Nombre de usuario"
                className="mt-3 p-3 border rounded-xl bg-gray-50"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="p-2 mt-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="N_documento">Numero de documento</label>
            <input 
                id="N_documento"
                type="number" 
                className="p-3 border rounded-xl bg-gray-50"
                value={N_documento}
                onChange={e => setN_documento(e.target.value)}
            />
            </div>
            <div className="my-5 p-2">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
            <input 
                id="email"
                type="email" 
                placeholder="Email de registo"
                className="mt-3 p-3 border rounded-xl bg-gray-50"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
          
            
      </div>
        <div className="">
        <div className="p-2 ">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="apellido">Apellido</label>
            <input 
                id="apellido"
                type="text" 
                placeholder="apellido de usuario"
                className="w-100 mt-3 p-3 border rounded-xl bg-gray-50"
                value={apellido}
                onChange={e => setApellido(e.target.value)}
            />
            </div>
          <div className="mr-7 p-2 mt-4">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="P_formacion">Programa de formacion</label>
            <input 
                id="P_formacion"
                type="text" 
                placeholder="Programa de formacion"
                className=" mt-3 p-3 border rounded-xl bg-gray-50"
                value={P_formacion}
                onChange={e => setP_formacion(e.target.value)}
            />
          </div>
          <div className="p-2 mt-3">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="ficha">Ficha</label>
            <input 
                id="ficha"
                type="number" 
                className=" mt-3 p-3 border rounded-xl bg-gray-50"
                value={ficha}
                onChange={e => setFicha(e.target.value)}
            />
          </div>
        </div>
        <div>
        <div className="">
        <div className="p-2 ">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="TD">Tipo de documento</label>
                <select
                  id="TD"
                  className='border-2 w-100 p-2 mt-4 placeholder-gray-400 rounded-md'
                  value={tipo_documento}
                  onChange={e => setTipo_documento(e.target.value)}
                >
                  <option value="">-- Seleccionar --</option>
                    {TIPO_DOCUMENTO.map(option => (
                      <option key={option}> {option}</option>
                    ))}
                </select>
            </div>
          <div className="mr-7 p-2 mt-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
            <input 
                id="password"
                type="password" 
                placeholder="Password de registo"
                className="mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
          </div>
            <div className="mt-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repite el Password</label>
            <input 
                id="password2"
                type="password" 
                placeholder="Repite el Password"
                className="mt-3 p-3 border rounded-xl bg-gray-50"
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
            />
            </div>
        </div>
      </div> 
        </div>
        <input 
            type="submit"
            value='Registrar'
            className="bg-green-600 p-20 mb-5 py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-green-800 transition-color"
        />
        <nav className="lg:flex lg:justify-between">
        <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to='/login'>
            ¿ya tienes una cuenta? Inicia Sesion
        </Link>
        <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to='/olvide-password'>
            Olvide mi constraseña
        </Link>
        </nav>
    </form>
    
</>
  )
}

export default Registrar
