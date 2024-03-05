import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import Swal from 'sweetalert2'

const TIPO_DOCUMENTO = ['TI', 'CC', 'CE']

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [tipo_documento, setTipo_documento] = useState('')
  const [N_documento, setN_documento] = useState('')
  const [P_formacion, setP_formacion] = useState('')
  const [ficha, setFicha] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate()
  const [isValidEmail, setIsValidEmail] = useState(true);

  //comprobar si es un correo electronico
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const validateEmail = (email) => {
    // Validación simple de correo electrónico
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre, apellido, tipo_documento, N_documento, P_formacion, ficha, email, password, repetirPassword].includes('')) {
      Swal.fire({
        title: "Todos los campos son obligatorios",
        confirmButtonColor: "#d33",
      })
      return
    }
    if (password !== repetirPassword) {
      Swal.fire({
        title: "las contraseñas no coinciden",
        confirmButtonColor: "#d33",
      })
      return
    }
    if (password.length < 6) {
      Swal.fire({
        title: "la contraseña es muy corta, minimo 6 caracteres",
        confirmButtonColor: "#d33",
      })
      return
    }
    setAlerta({})

    //crear usuario
    try {
      const { data } = await clienteAxios.post(`/usuarios`,
        { nombre, apellido, tipo_documento, N_documento, P_formacion, ficha, email, password, repetirPassword })
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
        <h1 className="font-black text-6xl capitalize text-center mb-10" style={{ color: '#39A900' }}>Registrate</h1>
        {msg && <Alerta alerta={alerta} />}

        <div className="md:flex">
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

            <div className="my-5 p-2">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="correo electronico"
                className={`w-full mt-3 p-3 border rounded-xl bg-gray-50 ${isValidEmail ? '' : 'border-red-500'}`}
                value={email}
                onChange={handleChange}
              />
              {!isValidEmail && <p className="text-red-500 mt-1 text-sm">Por favor ingresa un correo electrónico válido.</p>}
            </div>
          </div>

          <div className="">
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
                type="text"
                className=" mt-3 p-3 border rounded-xl bg-gray-50"
                value={ficha}
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFicha(value)
                }}
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
          </div>
          <div>
            <div className="">

              <div className="p-2 mt-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="N_documento">Numero de documento</label>
                <input
                  id="N_documento"
                  type="text"
                  className="p-3 border rounded-xl bg-gray-50"
                  value={N_documento}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '');
                    setN_documento(value)
                  }}
                />
              </div>
              <div className="mr-7 p-2 mt-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
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
                  placeholder="Repite la Contraseña"
                  className="mt-3 p-3 border rounded-xl bg-gray-50"
                  value={repetirPassword}
                  onChange={e => setRepetirPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <input
            type="submit"
            value='Registrar'
            className="mt-10 p-20 mb-5 py-3 text-white uppercase font-bold rounded"
            style={{ background: '#39A900', transition: 'background-color 0.3s' }}
            onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
            onMouseLeave={(e) => e.target.style.background = '#39A900'}
          />
        </div>

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
