import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer>
            <div className=" bg-white mt-7">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-flow-cols-1 md:grid-cols-2 lg:grid-flow-cols-4 gap-2">
                        <div className="mb-5">
                            <img src="/public/logo_sena.png" alt="logo sena" />
                            <h1 className="uppercase" style={{ color: '#39A900' }}>servicio nacional de aprendizaje</h1>
                        </div>
                        <div className="mb-5 mt-16">
                            <h2 className="text-center uppercase" style={{ color: '#39A900' }}>Acerca de nosotros</h2>
                            <nav className="lg:flex lg:justify-between">
                                <div>
                                    <Link
                                        to='/acerca-de'
                                        className="p-10 w-full py-3 text-slate-500 uppercase font-bold rounded
                                    hover:cursor-pointer hover:text-slate-900 transition-color"
                                    >Acerca De
                                    </Link>
                                </div>
                                <div>
                                    <h2 className='block text-center my-5 text-slate-500 uppercase text-sm'>Moni-web</h2>
                                    <p className="text-slate-500">Fase de desarrollo</p>
                                </div>

                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
