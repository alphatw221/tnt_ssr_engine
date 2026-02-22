import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WebsiteEditor from '@/pages/website_editor/WebsiteEditor'

import { Providers} from '@/redux/provider'
import PrivateRoute from '@/components/route/PrivateRoute.jsx'

import UserLoginPage from '@/pages/user_login_page/UserLoginPage.jsx'
const AppCSR = ({}) =>{

    return <BrowserRouter>
        <Routes>
            <Route path="/website_backend/website_editor" 
                element={
                    <Providers >
                        <PrivateRoute>
                            <WebsiteEditor/>
                        </PrivateRoute>
                    </Providers>
                }/>
            <Route path="/website_backend/website_editor/:page_name" 
                element={
                    <Providers >
                        <PrivateRoute>
                            <WebsiteEditor/>
                        </PrivateRoute>
                    </Providers>
                }/>
            <Route path="/website_backend/website_editor/:page_name/:object_uuid" 
                element={
                    <Providers >
                        <PrivateRoute>
                            <WebsiteEditor/>
                        </PrivateRoute>
                    </Providers>
                }/>
            <Route path="/website_backend/user_login" element={
                <Providers >
                    <UserLoginPage/>
                </Providers>
                }/>
            <Route path="*" element={<div>not found</div> } />
        </Routes>
    </BrowserRouter>


}

export default AppCSR