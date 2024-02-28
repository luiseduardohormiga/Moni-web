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

    const { obtenerPostulacion, postulado, calificarPostulado, cargando } = useConvocatorias()

    const { auth } = useAuth()
    const params = useParams()

    useEffect(() => {
        obtenerPostulacion(params.id)
    }, [])

    useEffect(() => {
        if (params.id && postulado) {
            setId(postulado._id);
            setCalificacionAdmin(postulado.calificacionAdmin);
            setCalificacionInstructor(postulado.calificacionInstructor);
            setCalificacionPsicologo(postulado.calificacionPsicologo);
        }
    }, [params, postulado]);

    const handleSubmit = async e => {
        e.preventDefault();
        // Validación de campos vacíos
        if ([calificacionAdmin, calificacionInstructor, calificacionPsicologo].includes('')) {
            Swal.fire({
                title: "la calificacion es obligatoria!",
                confirmButtonColor: "#39A900"
            });
            return;
        }

        //pasar al provider
        await calificarPostulado({ id, calificacionAdmin, calificacionInstructor, calificacionPsicologo });
        setId('');
        setCalificacionAdmin('');
        setCalificacionInstructor('');
        setCalificacionPsicologo('');
    }
    if (cargando) return 'cargando...'
    return (
        <>
            <h1 className="uppercase font-bold text-center">Califica Al postulado {postulado.nombreUsuario} </h1>
            <form className="bg-white max-w-md mx-auto mt-10 p-10 " onSubmit={handleSubmit}>
                <div>
                    {auth.rol === 'admin' ?
                        <>
                            <div className="mt-10">
                                <label className="uppercase">calificacion admin</label>
                                <input
                                    type="text"
                                    className="mt-3 p-3 border rounded-xl bg-gray-50"
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
                                    className="mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={calificacionInstructor}
                                    readOnly={true}
                                    style={{ backgroundColor: '#c2c0c0', color: '#fff' }}
                                />
                            </div>
                            <div className="mt-5">
                                <label className="uppercase">calificacion psicologo</label>
                                <input
                                    type="text"
                                    className="mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={calificacionPsicologo}
                                    readOnly={true}
                                    style={{ backgroundColor: '#c2c0c0', color: '#fff' }}
                                />
                            </div>
                        </>
                        : auth.rol === 'instructor' ?
                            <div className="mt-5">
                                <label className="uppercase">calificacion instructor</label>
                                <input
                                    type="text"
                                    className="border ml-5"
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
                            : auth.rol === 'psicologo' ?
                                <div className="mt-5">
                                    <label className="uppercase">calificacion psicologo</label>
                                    <input
                                        type="text"
                                        className="border ml-5"
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
        </>
    )
}

export default CalificacionesPostulado
