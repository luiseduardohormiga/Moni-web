import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault()

        if (email === '' || email.length < 6) {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }
        try {
            const { data } =  await clienteAxios.post(`/usuarios/olvide-password`, { email })            
            setAlerta({
                msg: data.msg,
                error: false
            })
            //redireccionar
            setTimeout(() => {
                setAlerta({})
                navigate('/')
            },2000)
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
    <h1 className="text-green-600 font-black text-6xl capitalize text-center">Recupera tu cuenta</h1>

    { msg && <Alerta alerta={alerta}/>}

    <form  
    className="my-10 bg-white shadow rounded-lg p-10"
    onSubmit={handleSubmit}
    >
    
        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
            <input 
                id="email"
                type="email" 
                placeholder="Email de registo"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <input 
            type="submit"
            value="contituar"
            className="bg-green-600 mb-5 w-full py-3 text-white uppercase font-bold rounded
            hover:cursor-pointer hover:bg-green-800 transition-color"
        />
    </form>
    <nav className="lg:justify-between">
        <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm '
            to='/'>
            Inicio 
        </Link>
    </nav>
    </div>
</>
  )
}

export default OlvidePassword
