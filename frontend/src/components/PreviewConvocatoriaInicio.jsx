import { useState } from 'react';
import { Link } from 'react-router-dom';
const PreviewConvocatoriaInicio = ({ convocatoria }) => {
    const { titulo, descripcion, img } = convocatoria;
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

    const toggleDescripcion = () => {
        setMostrarDescripcion(!mostrarDescripcion);
    };

    return (
        <div className="bg-gray-200 shadow rounded-lg md:p-10 justify-center mr-5">
            {convocatoria.img && <img className="mx-auto mt-10" src={img.url} alt="imagen" style={{ width: '85%', height: 'auto' }} />}
            <div className="ml-10 mt-10 p-2 ">
                <h1 className="uppercase font-black text-2xl text-center">{titulo}</h1>
                <div className='text-center '>
                    {mostrarDescripcion &&
                        <div>
                            <p className="mt-7 mb-7">{descripcion}</p>
                            <h2 className="text-center">
                                <Link
                                    to={'/login'}
                                    className="uppercase font-bold"
                                    style={{ color: '#39A900', transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => e.target.style.color = '#2F7B00'}
                                    onMouseLeave={(e) => e.target.style.color = '#39A900'}
                                >Inicia Sesion para poder Postularte
                                </Link>
                            </h2>
                        </div>}
                    <button
                        onClick={toggleDescripcion}
                        className="uppercase font-bold mt-2 bg-gray-300 p-2"
                        style={{ color: '#39A900', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = '#2F7B00'}
                        onMouseLeave={(e) => e.target.style.color = '#39A900'}
                    >
                        {mostrarDescripcion ? 'Ocultar Descripción' : 'Mostrar Descripción'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewConvocatoriaInicio;
