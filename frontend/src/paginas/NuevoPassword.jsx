import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

    const [password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState({})
    const [passwordModificado, setPasswordModificado] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        if (password.length < 6) {
            setAlerta({
                msg: 'la contraseña debe tener minimo 6 caracteres',
                error: true
            })
            return
        }
        try {
            const url = `/usuarios/olvide-password/${token}`

            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
            //redireccionar
            setTimeout(() => {
                setAlerta({})
                navigate('/login')
            }, 2000)
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
            <div>
                <h1 className="font-black text-6xl capitalize" style={{ color: '#39A900' }}>Restablese tu contraseña</h1>

                {msg && <Alerta alerta={alerta} />}
                {tokenValido && (
                    <form
                        className="my-10 bg-white shadow rounded-lg p-10"
                        onSubmit={handleSubmit}
                    >

                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">nueva Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Escribe tu nueva contraseña"
                                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Guardar nueva contraseña"
                            className="mb-5 w-full py-3 text-white uppercase font-bold rounded"
                            style={{ background: '#39A900', transition: 'background-color 0.3s' }}
                            onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
                            onMouseLeave={(e) => e.target.style.background = '#39A900'}
                        />
                    </form>
                )}
                {passwordModificado && (
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to='/'>
                        Inicia Sesion
                    </Link>
                )}
            </div>
        </>
    )
}

export default NuevoPassword
