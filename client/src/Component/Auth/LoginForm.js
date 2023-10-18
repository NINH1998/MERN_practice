import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/authContext';

const LoginForm = () => {
    // CONTEXT
    const { loginUser } = useContext(AuthContext);

    // LOCAL STATE
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const [ErrorMessage, setErrorMessage] = useState('');

    const login = async (event) => {
        try {
            event.preventDefault();
            const loginData = await loginUser(loginForm);

            if (!loginData.success) {
                setErrorMessage('Incorrect username or password');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { username, password } = loginForm;

    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    return (
        <div className="w-full max-w-sm mt-6">
            <form onSubmit={login}>
                <div className="mb-4">
                    <input
                        className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={onChangeLoginForm}
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChangeLoginForm}
                        required
                    />
                    {ErrorMessage && (
                        <p className="text-red-500 text-base italic mt-3">{ErrorMessage}</p>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    <button className="shadow-sm shadow-gray-500 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        LOGIN
                    </button>
                </div>
                <div className="text-white mt-2">
                    Don't have an account?
                    <Link to="/register">
                        <span className="btn-small btn-green shadow-sm shadow-gray-500 ml-2">
                            Register
                        </span>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
