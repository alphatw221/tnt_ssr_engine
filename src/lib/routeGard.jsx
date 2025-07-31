import { Outlet, Navigate } from 'react-router-dom'
import routeNames from '../route_names'
import Cookies from 'js-cookie'

export function IsNotAuthenticatedRouteGuard (){

    if(![null, undefined, ''].includes(Cookies.get('customer_access_token'))){
        return (<Outlet/>)
    }else{
        return (<Navigate to={routeNames.home}/>)
    }
}