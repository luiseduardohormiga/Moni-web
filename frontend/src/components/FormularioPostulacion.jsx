import React from 'react'

const FormularioPostulacion = () => {
  return (
    <div>
        {msg && <Alerta alerta={alerta}/>}
        <form 
            onSubmit={handleSubmit}
            className="my-10">
            <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor='nombre'
            >
                Hoja de Vida
            </label>
            <input 
                type="file" 
                id='archivoPDF'
                placeholder='Nombre de la Tarea'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={archivoPDF}
                onChange={e => setArchivoPDF(e.target.value)}
                accept='pdf'
            />
            </div>
            <input type="submit"
            className="bg-green-600 hover:bg-green-700 w-full p-3 text-white uppercase text-sm font-bold cursor-pointer transition-colors rounded"
            value={'Crear postulacion'}
            />
        </form>
    </div>
  )
}

export default FormularioPostulacion
