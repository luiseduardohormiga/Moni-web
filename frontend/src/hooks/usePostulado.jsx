import { useContext } from "react";
import PostulacionContext from "../context/PostulacionProvider"

const usePostulado = () => {
    return useContext(PostulacionContext)
}
export default usePostulado