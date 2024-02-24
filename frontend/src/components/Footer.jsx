const Footer = () => {
  return (
    <footer>
        <div className=" bg-white mt-10">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-flow-cols-1 md:grid-cols-2 lg:grid-flow-cols-4 gap-2">
                    <div className="mb-5">
                        <img src="/public/logo_sena.png" alt="logo sena" />
                        <h1 className="uppercase" style={{color: '#39A900'}}>servicio nacional de aprendizaje</h1>
                    </div>
                    <div className="mb-5 mt-16">
                        <h2 className="text-center uppercase" style={{color: '#39A900'}}>Acerca de nosotros</h2> 
                        <nav className="lg:flex lg:justify-between">
                            <div>
                                <h2 className='block text-center my-5 text-slate-500 uppercase text-sm'>diseñadores</h2>
                                <p className="text-slate-500">
                                    Luis Gabriel Cuero Quilindo
                                </p>
                                <p className="text-slate-500">
                                    Luis Eduardo Hurtado HOrmiga
                                </p>
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
