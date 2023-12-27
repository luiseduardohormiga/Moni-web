import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Alerta from "./Alerta"

const TIPO_DOCUMENTO = ['TI', 'CC', 'CE']
const ROL = ['Aprendiz', 'admin', 'instructor', 'psicologo']

const FormularioUsuario = () => {
    const [id, setId] = useState(null)
    const [ nombre, setNombre ] = useState('')
    const [ apellido, setApellido ] = useState('')
    const [ tipo_documento, setTipo_documento ] = useState('')
    const [ N_documento, setN_documento ] = useState('')
    const [ P_formacion, setP_formacion ] = useState('')
    const [ ficha, setFicha ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ rol, setRol ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

  

    const params = useParams()
    const { mostrarAlerta, alerta, submitUsuario, usuario } = useAuth()
    
    useEffect(() => {
      if (params.id) {
        setId(usuario._id)
        setNombre(usuario.nombre)
        setApellido(usuario.apellido)
        setTipo_documento(usuario.tipo_documento)
        setN_documento(usuario.N_documento)
        setP_formacion(usuario.P_formacion)
        setFicha(usuario.ficha)
        setEmail(usuario.email)
        setRol(usuario.rol)
        setPassword(usuario.password)
        setRepetirPassword(usuario.password)
      }
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault()
        if ([nombre, apellido, tipo_documento, N_documento, P_formacion, ficha, email, rol, password, repetirPassword ].includes('')) {
            mostrarAlerta({
                msg: "todos los campos son obligatorios",
                error: true
              })
              return
        }
        if (password !== repetirPassword) {
          mostrarAlerta({
              msg: "las contraseñas no coinciden",
              error: true
            })
            return
          }
          if (password.length < 6) {
            mostrarAlerta({
              msg: "la contraseña es muy corta, minimo 6 caracteres",
              error: true
            })
            return
          }
          //pasar al provider
            await submitUsuario({ id, nombre, apellido, tipo_documento, N_documento, P_formacion, ficha, email, rol, password, repetirPassword })
            setId('')
            setNombre('')
            setApellido('')
            setTipo_documento('')
            setN_documento('')
            setP_formacion('')
            setFicha('')
            setEmail('')
            setRol('')
            setPassword('')
            setRepetirPassword('')
    }
    const { msg } = alerta 
  return (
    <>
    <form 
    className="my-7 bg-white shadow rounded-lg p-10"
    onSubmit={handleSubmit}>
        {msg && <Alerta alerta={alerta} />}
        {id ? 
        <div className="flex justify-center">

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
            <div className="p-2">
        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="ROL">Rol</label>
            <select
              id="ROL"
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={rol}
              onChange={e => setRol(e.target.value)}
            >
              <option value="">-- Seleccionar --</option>
                {ROL.map(option => (
                  <option key={option}> {option}</option>
                ))}
            </select>
        </div>
        <div className="mt-7">
        <input 
            type="submit"
            value={id ? 'Actualizar Usuario' : 'Nuevo Usuario'}
            className="bg-green-600 mb-5 w-full py-3 text-white uppercase font-bold rounded
            hover:cursor-pointer hover:bg-green-800 transition-color"
        />
        </div>
        </div>
        </div>
         : 
         
         <div className="flex justify-center">

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
                 <div className="">
                   
                     <div className="p-2">
                          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="ROL">Rol</label>
                        <select
                          id="ROL"
                          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                          value={rol}
                          onChange={e => setRol(e.target.value)}
                        >
                          <option value="">-- Seleccionar --</option>
                            {ROL.map(option => (
                              <option key={option}> {option}</option>
                            ))}
                        </select>
                      </div>
                      <div className="p-2">
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
                 <div className="mt-7">
                 <input 
                     type="submit"
                     value={id ? 'Actualizar Usuario' : 'Nuevo Usuario'}
                     className="bg-green-600 mb-5 w-full py-3 text-white uppercase font-bold rounded
                     hover:cursor-pointer hover:bg-green-800 transition-color"
                 />
                 </div>
          </div>
        </div>
                 
                 </div>
                 
                 </div>

          }
        
    </form>
</>
  )
}

export default FormularioUsuario
