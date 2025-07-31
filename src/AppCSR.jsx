import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WebsiteEditor from '@/pages/website_editor/WebsiteEditor'

import { Providers, PersistProvider, myDndProvider } from '@/redux/provider'
import PrivateRoute from '@/components/route/PrivateRoute.jsx'

import UserLoginPage from '@/pages/user_login_page/UserLoginPage.jsx'
const AppCSR = ({}) =>{

    return <BrowserRouter>
        <Routes>
            <Route path="/website_backend/website_editor" 
                element={
                    <Providers >
                        <PersistProvider>
                            <PrivateRoute>
                                <WebsiteEditor/>
                            </PrivateRoute>
                        </PersistProvider>
                    </Providers>
                }/>
            <Route path="/website_backend/website_editor/:page_name" 
                element={
                    <Providers >
                        <PersistProvider>
                            <PrivateRoute>
                                <WebsiteEditor/>
                            </PrivateRoute>
                        </PersistProvider>
                    </Providers>
                }/>
            <Route path="/website_backend/website_editor/:page_name/:object_uuid" 
                element={
                    <Providers >
                        <PersistProvider>
                            <PrivateRoute>
                                <WebsiteEditor/>
                            </PrivateRoute>
                        </PersistProvider>
                    </Providers>
                }/>
            <Route path="/website_backend/user_login" element={
                 <Providers >
                        <PersistProvider>
                            <UserLoginPage/>
                        </PersistProvider>
                    </Providers>
                }/>
            <Route path="*" element={<div>not found</div> } />
        </Routes>
    </BrowserRouter>


}

export default AppCSR