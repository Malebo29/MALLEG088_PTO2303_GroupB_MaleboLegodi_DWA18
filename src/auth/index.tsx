import { useLocation, Outlet, Navigate } from "react-router-dom"
import { useShowsContext } from "../context/ShowsContext"


const RequireAuth = ()=> {
    const { token } = useShowsContext()
    const location = useLocation()

    return (
        token != null ? <Outlet /> : <Navigate to='/signin' state={{from: location}} replace/>
    )
}

export default RequireAuth

