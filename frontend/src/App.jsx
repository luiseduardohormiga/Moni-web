import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Inicio from './paginas/Inicio'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Convocatoiras from './paginas/Convocatorias'
import NuevaConvocatoria from './paginas/NuevaConvocatoria'
import Convocatoria from './paginas/Convocatoria'
import EditarConvocatoria from './paginas/EditarConvocatoria'
import NuevoUsuario from './paginas/NuevoUsuario'
import ListarUsuarios from './paginas/ListarUsuarios'
import Usuario from './paginas/Usuario'
import EditarUsuario from './paginas/EditarUsuario'
import CalificacionesPostulado from './paginas/CalificacionesPostulado'

import { AuthProvider } from './context/AuthProvider'
import { ConvocatoriasProvider } from './context/ConvocatoriasProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConvocatoriasProvider>
            <Routes>
              <Route path='/' element={<Inicio />}>
                <Route index element={<Convocatoiras />} />
              </Route>
              <Route path='/' element={<AuthLayout />}>
                <Route path='login' element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route path='olvide-password/:token' element={<NuevoPassword />} />
                <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
              </Route>
              <Route path='/convocatorias' element={<RutaProtegida />}>
                <Route index element={<Convocatoiras />} />
                <Route path='crear-convocatoria' element={<NuevaConvocatoria />} />
                <Route path=':id' element={<Convocatoria />} />
                <Route path='editar/:id' element={<EditarConvocatoria />} />
              </Route>
              <Route path='/usuarios' element={<RutaProtegida />}>
                <Route index element={<ListarUsuarios />} />
                <Route path='crear-usuario' element={<NuevoUsuario />} />
                <Route path=':id' element={<Usuario />} />
                <Route path='editar/:id' element={<EditarUsuario />} />
              </Route>

              <Route path='/postulaciones' element={<RutaProtegida />}>
                <Route index element={<CalificacionesPostulado />} />
                <Route path=':id' element={<CalificacionesPostulado />} />
              </Route>
            </Routes>
        </ConvocatoriasProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
