import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider(props) {
    const navigate = useNavigate();

    const [state, setState] = useState({
        user: null,
        signIn: { isLoading: false, isSignInError: false, message: "" },
        signUp: { isLoading: false, isSignUpError: null, message: "" },
        isAuthenticated: Boolean(localStorage.getItem("token")),
    });

    //register
    const register = async (data) => {
        try {
            setState((prevState) => ({
                ...prevState,
                signUp: { ...prevState.signUp, isLoading: true },
            }));

            await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/register`,
                data
            );

            setState((prevState) => ({
                ...prevState,
                signUp: {
                    ...prevState.signUp,
                    isLoading: false,
                    isSignUpError: false,
                },
            }));
        } catch (error) {
            console.error("Registration failed:", error);

            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            } else {
                console.error("Error message:", error.message);
            }

            setState((prevState) => ({
                ...prevState,
                signUp: {
                    ...prevState.signUp,
                    isLoading: false,
                    isSignUpError: true,
                },
            }));
        }
    };

    //login
    const login = async (data) => {
        try {
            setState((prevState) => ({
                ...prevState,
                signIn: { ...prevState.signIn, isLoading: true },
            }));

            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/login`,
                data
            );

            const token = response.data.token;
            console.log("token: " + token);

            const userDataFromToken = jwtDecode(token);

            setState((prevState) => ({
                ...prevState,
                user: { ...userDataFromToken },
                isAuthenticated: true,
                isSignInError: false,
                signIn: { ...prevState.signIn, isLoading: false },
            }));

            console.log(state);

            localStorage.setItem("token", token);
            navigate("/web/home");
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                user: null,
                isAuthenticated: false,
                signIn: {
                    ...prevState.signIn,
                    isLoading: false,
                    isSignInError: true,
                    message:
                        error.response?.data?.error ||
                        "An unexpected error occurred.",
                },
            }));
            navigate("/web/login");
            console.log("error " + error);
        }
    };

    //logout
    const logout = () => {
        localStorage.removeItem("token");

        setState({ ...state, user: null });
        console.log(localStorage);
        navigate("/web/login");
    };

    //decode token
    const checkToken = () => {
        try {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setState((prevState) => ({
                    ...prevState,
                    isAuthenticated: false,
                    user: null,
                }));
                return;
            }

            const userDataFromToken = jwtDecode(storedToken);

            setState((prevState) => ({
                ...prevState,
                user: userDataFromToken,
                isAuthenticated: true,
            }));

        
        } catch (error) {
            console.error("Error decoding token:", error);

            setState((prevState) => ({
                ...prevState,
                isAuthenticated: false,
                user: null,
            }));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                setState,
                checkToken,
                login,
                logout,
                register,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };
