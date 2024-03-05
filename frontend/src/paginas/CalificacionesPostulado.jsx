import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useConvocatorias from "../hooks/useConvocatorias"
import Swal from 'sweetalert2';

const CalificacionesPostulado = () => {
    const [id, setId] = useState(null);
    const [calificacionAdmin, setCalificacionAdmin] = useState('');
    const [calificacionPsicologo, setCalificacionPsicologo] = useState('');
    const [calificacionInstructor, setCalificacionInstructor] = useState('');
    const [recomendacion, setRecomendacion] = useState('');
    const { obtenerPostulacion, postulado, calificarPostulado } = useConvocatorias()
    const { auth } = useAuth()
    const params = useParams()

    useEffect(() => {
        obtenerPostulacion(params.id)
    }, [])

    useEffect(() => {
        if (params.id && postulado) {
            setId(postulado._id || '');// Si es undefined, establece una cadena vacía
            setCalificacionAdmin(postulado.calificacionAdmin);
            setCalificacionInstructor(postulado.calificacionInstructor);
            setCalificacionPsicologo(postulado.calificacionPsicologo);
            setRecomendacion(postulado.recomendacion)
        }
    }, [params, postulado]);

    const handleSubmit = async e => {
        e.preventDefault();
        // Validación de campos vacíos
        if ([calificacionAdmin, calificacionInstructor, calificacionPsicologo, recomendacion].includes('')) {
            Swal.fire({
                title: "la calificacion es obligatoria!",
                confirmButtonColor: "#a90000"
            });
            return;
        }

        //pasar al provider
        await calificarPostulado({ id, calificacionAdmin, calificacionInstructor, calificacionPsicologo, recomendacion });
        setId('');
        setCalificacionAdmin('');
        setCalificacionInstructor('');
        setRecomendacion('');
        setCalificacionPsicologo('');
    }
    return (
        <>
            <h1 className="font-black text-4xl capitalize text-center mt-8">Califica Al postulado {postulado.nombreUsuario} </h1>
            <div className="md:flex ">
                {auth.rol === 'admin' ?
                    <div className="flex-1 mb-10">
                        {postulado.pdf && postulado.pdf.url && (
                            <iframe
                                title="PDF Preview"
                                width="100%"
                                height="700px"
                                src={postulado.pdf.url}
                            ></iframe>
                        )}
                    </div>
                    :
                    ''
                }
                <form className="bg-white mx-auto p-10 flex-2 " onSubmit={handleSubmit}>
                    <div>
                        {auth.rol === 'admin' ?
                            <>
                                <div className="mt-10">
                                    <label className="uppercase">calificacion admin</label>
                                    <input
                                        type="text"
                                        className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
                                        value={calificacionAdmin}
                                        onChange={e => {
                                            const value = e.target.value;
                                            // Solo permitir números (incluyendo teclas especiales de navegación)
                                            if (/^\d*$/.test(value) || value === '') {
                                                setCalificacionAdmin(value);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="mt-5">
                                    <label className="uppercase">calificacion instructor</label>
                                    <input
                                        type="text"
                                        className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
                                        value={calificacionInstructor}
                                        readOnly={true}
                                        style={{ backgroundColor: '#c2c0c0', color: '#fff' }}
                                    />
                                </div>
                                <div className="mt-5">
                                    <label className="uppercase">Recomendacion Aval:</label>
                                    <input
                                        type="text"
                                        className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
                                        value={recomendacion}
                                        readOnly={true}
                                        style={{ backgroundColor: '#c2c0c0', color: '#fff', height: '100px' }}
                                    />
                                </div>
                                <div className="mt-5">
                                    <label className="uppercase">calificacion psicologo</label>
                                    <input
                                        type="text"
                                        className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
                                        value={calificacionPsicologo}
                                        readOnly={true}
                                        style={{ backgroundColor: '#c2c0c0', color: '#fff' }}
                                    />
                                </div>
                            </>
                            : auth.rol === 'instructor' ?
                                <>
                                    <div className="mt-5">
                                        <label className="uppercase">calificacion instructor</label>
                                        <input
                                            type="text"
                                            className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
                                            value={calificacionInstructor}
                                            onChange={e => {
                                                const value = e.target.value;
                                                // Solo permitir números (incluyendo teclas especiales de navegación)
                                                if (/^\d*$/.test(value) || value === '') {
                                                    setCalificacionInstructor(value);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <label className="uppercase">Recomendacion Aval:</label>
                                        <input
                                            type="text"
                                            className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
                                            value={recomendacion}
                                            onChange={e => setRecomendacion(e.target.value)}
                                            style={{ height: '100px' }}
                                        />
                                    </div>
                                </>
                                : auth.rol === 'psicologo' ?
                                    <div className="mt-5">
                                        <label className="uppercase">calificacion psicologo</label>
                                        <input
                                            type="text"
                                            className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
                                            value={calificacionPsicologo}
                                            onChange={e => {
                                                const value = e.target.value;
                                                // Solo permitir números (incluyendo teclas especiales de navegación)
                                                if (/^\d*$/.test(value) || value === '') {
                                                    setCalificacionPsicologo(value);
                                                }
                                            }}
                                        />
                                    </div>
                                    : ''
                        }
                    </div>
                    <div>
                        <input
                            type="submit"
                            value={'Calificar'}
                            className="mb-5 w-full py-3 text-white uppercase font-bold rounded
                        hover:cursor-pointer mt-10"
                            style={{ background: '#39A900', transition: 'background-color 0.3s' }}
                            onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
                            onMouseLeave={(e) => e.target.style.background = '#39A900'}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default CalificacionesPostulado
