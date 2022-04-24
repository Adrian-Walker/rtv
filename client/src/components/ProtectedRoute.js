import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider';


// export default function ProtectedRoute2(props) {
//     const {path, redirectTo, component: C, token, ...rest } = props
//     return token ?
//         <Route path={path} render={() => <C {...rest}/>}/> :
//         <Routes to={redirectTo}/>
// }

export default function ProtectedRoute({children, route, negate}) {
    const { token} = useContext(UserContext);
    console.log(route)
    if(negate) return token ? <Navigate to={route} /> : children
    return token ? children : <Navigate to={route} />
}
