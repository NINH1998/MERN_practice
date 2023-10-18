import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { useContext, useState } from 'react';

const RegisterForm = () => {
    // CONTEXT
    const { registerUser } = useContext(AuthContext);

    // LOCAL STATE
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [ErrorMessage, setErrorMessage] = useState('');

    const register = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Password do not match');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return;
        }

        try {
            const registerData = await registerUser(registerForm);

            if (!registerData.success) {
                setErrorMessage('This account has already been registered');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (e) =>
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

    return (
        <div className="w-full max-w-sm mt-6">
            <form onSubmit={register}>
                <div className="mb-4">
                    <input
                        className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />

                    {ErrorMessage && (
                        <p className="text-red-500 text-base italic mt-3">{ErrorMessage}</p>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    <button className="shadow-sm shadow-gray-500 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SIGN IN
                    </button>
                </div>
                <div className="text-white-500 mt-2">
                    Already have an account?
                    <Link to="/login">
                        <span className="btn-small text-white btn-green shadow-sm shadow-gray-500 ml-2">
                            LOGIN
                        </span>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
