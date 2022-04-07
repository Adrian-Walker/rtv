import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const {path, redirectTo, component: C, token, ...rest } = props
    return token ?
        <Route path={path} render={() => <C {...rest}/>}/> :
        <Routes to={redirectTo}/>
}
