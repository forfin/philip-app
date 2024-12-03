/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Header } from "./components/Header";
import { InputBox } from "./components/InputBox";
import { SignUpLink } from "./components/SignUpLink";
import AuthBackground from "../../common/AuthBackground";
import { useAuth } from "../../contexts/authentication";
import CircularProgress from "@mui/material/CircularProgress";

import InvalidUsernameModal from "./components/Modal/InvalidUsernameModal.jsx";

function LoginPage() {
    const navigate = useNavigate();
    const { login, state } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login({
            email: formData.email,
            password: formData.password,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            {/* page */}
            <div
                css={css`
                    display: flex;
                    justify-content: center;
                `}
            >
                <div css={pageLayout}>
                    <Header />
                    {state.signIn.isLoading ? (
                        <CircularProgress size={50} color="primary" />
                    ) : (
                        <>
                            <form css={formLayout} onSubmit={handleSubmit}>
                                <InputBox
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                />
                            </form>
                        </>
                    )}

                    <SignUpLink navigate={navigate} />
                    <InvalidUsernameModal />
                    <AuthBackground />
                </div>
            </div>
        </>
    );
}

const pageLayout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    position: relative;
    height: 100vh;
    width: 1440px;
`;

const formLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 30%;
`;

export default LoginPage;
