import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";



function useAuth() {
    return (
        useContext(AuthContext)
    )
}

export default useAuth
