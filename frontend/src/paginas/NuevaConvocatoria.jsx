import FormularioConvocatoria from "../components/FormularioConvocatoria"

const NuevaConvocatoria = () => {
  return (
    <>
      <h1 className="text-4xl font.black">Nueva Convocatorias</h1>
      
      <div className="bg-white p-1 shadow mt-10 rounded-lg">
        <FormularioConvocatoria />
      </div>
    </>
  )
}

export default NuevaConvocatoria
