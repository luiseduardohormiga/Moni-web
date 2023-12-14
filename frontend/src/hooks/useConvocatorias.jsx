import { useContext } from "react";
import ConvocatoriasContext from "../context/ConvocatoriasProvider";

const useConvocatorias = () =>{
    return useContext(ConvocatoriasContext)
}

export default useConvocatorias