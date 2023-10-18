import LoginForm from '../Component/Auth/LoginForm';
import RegisterForm from '../Component/Auth/RegisterForm';
import { AuthContext } from '../Context/authContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

const Auth = ({ authRoute }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;

    if (authLoading) {
        body = <Loading />;
    } else if (isAuthenticated) {
        return <Navigate to="/Dashboard" />;
    } else
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </>
        );
    return (
        <div className="h-screen bg-login-background bg-cover bg-no-repeat bg-center">
            <div className="bg-black/[0.5] h-full">
                <div className="landing-inner">
                    <h1>LearntIt</h1>
                    <h4 className="mt-4">Keep track what are you learning</h4>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
