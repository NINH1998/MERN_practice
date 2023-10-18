import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import { useContext } from 'react';

const NavbarMenu = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => logoutUser();

    return (
        <nav className=" flex text-4xl items-center justify-between flex-wrap bg-teal-400 p-6 shadow-md shadow-slate-600">
            <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer">
                <svg
                    className="fill-current h-8 w-8 mr-2"
                    width="70"
                    height="70"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <span className="font-semibold tracking-tight italic">Mi TodoList</span>
            </div>

            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className="w-full block lg:flex lg:items-center lg:w-auto">
                <div className="flex items-center ">
                    <p className="text-white text-lg uppercase font-bold">Welcome, {username}</p>
                    <button
                        onClick={logout}
                        className="ml-3 inline-block font-semibold text-lg px-4 py-2 leading-none border rounded bg-red-400 text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 hover:scale-110 transition ease-in-out duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavbarMenu;
