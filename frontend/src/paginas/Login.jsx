import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"
import Swal from "sweetalert2"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const { setAuth } = useAuth()
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

        if ([email, password].includes('')) {
            Swal.fire({
                title: "Todos los campos son obligatorios",
                confirmButtonColor: "#d33",
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/convocatorias')
        } catch (error) {
            Swal.fire({
                title: error.response.data.msg,
                confirmButtonColor: "#d33",
            })
        }
    }
    const { msg } = alerta
    return (
        <div className="lg:w-2/5">
            <h1 className="font-black text-6xl capitalize text-center"
                style={{ color: '#39A900' }}
            >Inicia sesion</h1>
            {msg && <Alerta alerta={alerta} />}
            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >

                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Correo Electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Escribe tu correo electrónico"
                        className={`w-full mt-3 p-3 border rounded-xl bg-gray-50 ${isValidEmail ? '' : 'border-red-500'}`}
                        value={email}
                        onChange={handleChange}
                    />
                    {!isValidEmail && <p className="text-red-500 mt-1 text-sm">Por favor ingresa un correo electrónico válido.</p>}
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Digite Contraseña"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesion"
                    className="mb-5 w-full py-3 text-white uppercase font-bold rounded"
                    style={{ background: '#39A900', transition: 'background-color 0.3s' }}
                    onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
                    onMouseLeave={(e) => e.target.style.background = '#39A900'}
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to='/registrar'>
                    ¿no tienes una cuenta? Registrate
                </Link>
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to='/olvide-password'>
                    Olvide mi constraseña
                </Link>
            </nav>
        </div>
    )
}

export default Login
