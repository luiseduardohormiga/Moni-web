import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const { id } = params 

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [])
  const { msg } = alerta
  return (
    <>
    <div>
      <h1 className="font-black text-6xl capitalize"style={{ color: '#39A900'}}>Confirma tu cuenta</h1>
      <div className='m5-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
      {msg && <Alerta alerta={alerta}/>}

      {cuentaConfirmada && (
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to='/login'>
          Inicia Sesion
        </Link>
      )}
    </div>
    </div>
    </>
  )
}

export default ConfirmarCuenta
