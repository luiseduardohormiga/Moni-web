import HeaderPrincipal from "../components/HeaderPrincipal"

const Inicio = () => {
  return (
    <>
        <HeaderPrincipal/>
        <div className="bg-white">
            <h1 className="text-green-600 font-black text-6xl capitalize text-center mt-8">Bienbenido a Moni-web</h1>
        </div>
        <div className="w-300 m-16 p-16 b-2 br-8 bg-white">
          <h2>NOMBRE DE LA CONVOCATORIA</h2>
          <p>requisitos de postulacion</p>
        </div>
        <div className="w-300 m-16 p-16 b-2 br-8 bg-white">
          <h2>NOMBRE DE LA CONVOCATORIA</h2>
          <p>requisitos de postulacion</p>
        </div>
    </>   
  )
}

export default Inicio
