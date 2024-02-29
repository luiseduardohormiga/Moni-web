
const Postulado = ({postulado}) => {
    const { archivoPDF } = postulado
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <h2>Hoja de vida</h2>
        <p className="text-sm text-gray-500 uppercase">{archivoPDF}</p>
      </div>
    </div>
  )
}

export default Postulado
