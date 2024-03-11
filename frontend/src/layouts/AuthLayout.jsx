import { Outlet } from "react-router-dom"
import HeaderPrincipal from "../components/HeaderPrincipal"
import Footer from "../components/Footer"

const AuthLayout = () => {
  return (
    <>
        <HeaderPrincipal/>
        <main className="container mx-auto p-5 md:flex md:justify-center">
          <Outlet/>
        </main>
        <Footer/>
    </>
  )
}

export default AuthLayout
