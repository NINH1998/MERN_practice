import axios from 'axios';
import { createContext, useReducer } from 'react';
import { useEffect } from 'react';
import { authReducer } from '../Reducer/authReducer';
import { apiURL, LOCAL_STORAGE_TOKEN } from './UrlApi';
import setAuthToken from '../Utils/setAuthToken';
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispath] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // Authenticate the user

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN]);
        }

        try {
            const response = await axios.get(`${apiURL}/auth`);

            if (response.data.success) {
                dispath({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN);
            setAuthToken(null);
            dispath({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null },
            });
        }
    };
    useEffect(() => {
        loadUser();
    }, []);

    // LOGIN

    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiURL}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
            }
            await loadUser();
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // REGISTER

    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiURL}/auth/register`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
            }
            await loadUser();
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        dispath({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
        });
    };

    const authContextData = { authState, loginUser, registerUser, logoutUser };

    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
