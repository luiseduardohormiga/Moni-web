import { Outlet } from "react-router-dom"
import HeaderPrincipal from "../components/HeaderPrincipal"

const AuthLayout = () => {
  return (
    <>
        <HeaderPrincipal/>
        <main className="container mx-auto p-5 md:flex md:justify-center">
            <Outlet/>
        </main>
    </>
  )
}

export default AuthLayout
