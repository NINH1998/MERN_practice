import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/authContext';

import Landing from './Component/Layout/Landing';
import Auth from './View/Auth';
import NavbarDefault from './Component/Layout/NavbarMenu';
import PostContextProvider from './Context/PostContext';
import Loading from './View/Loading';
import DashBoard from './View/DashBoard';

function App() {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) return <Loading />;
    return (
        <PostContextProvider>
            <Router>
                <Routes>
                    <Route exact path="/" Component={Landing} />
                    <Route
                        exact
                        path="/login"
                        Component={(props) => <Auth {...props} authRoute="login" />}
                    />
                    <Route
                        exact
                        path="/register"
                        Component={(props) => <Auth {...props} authRoute="register" />}
                    />
                    <Route
                        exact
                        path="/Dashboard"
                        element={
                            isAuthenticated ? (
                                <>
                                    <NavbarDefault />
                                    <DashBoard />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </Router>
        </PostContextProvider>
    );
}

export default App;
