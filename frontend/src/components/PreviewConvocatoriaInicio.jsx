import { Link } from "react-router-dom";

const PreviewConvocatoriaInicio = ({ convocatoria }) => {

    const { titulo, descripcion, img } = convocatoria

    return (
        <div className="bg-gray-200 shadow rounded-lg md:p-10 justify-center mt-10+ mr-10">
            
                {convocatoria.img && <img className="mx-auto mt-10" src={img.url} alt="imagen" style={{ width: '85%', height: 'auto' }} />}
            
            <div className="ml-10 mt-10 p-2">
                <h1 className="uppercase font-black text-2xl text-center">{titulo}</h1>
                <p className="mt-7 mb-7">
                    {''}{descripcion}
                </p>
                <h2 className="text-center">
                    <Link
                        to={'/login'}
                        className="uppercase font-bold"
                        style={{ color: '#39A900', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = '#2F7B00'}
                        onMouseLeave={(e) => e.target.style.color = '#39A900'}
                    >Inicia Sesion para poder Postularse
                    </Link>
                </h2>
            </div>
        </div>
    )
}

export default PreviewConvocatoriaInicio
