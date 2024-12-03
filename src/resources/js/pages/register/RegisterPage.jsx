/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import InputBox from "./components/InputBox";
import LoginLink from "./components/LoginLink";

import validateForm from "./validateForm";

import AuthBackground from "../../common/AuthBackground";
import { useAuth } from "../../contexts/authentication";
import CircularProgress from "@mui/material/CircularProgress";
import SuccessModal from "./components/Modal/SuccessModal";
import ErrorModal from "./components/Modal/ErrorModal";
import axios from "axios";

function RegisterPage() {
    const { register, state } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tel: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        tel: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm(formData, setFormErrors, formErrors);

        if (isValid) {
            register({
                ...formData,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData);
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
                    <div css={inputLayout}>
                        {state.signUp.isLoading === false && (
                            <>
                                <InputBox
                                    formData={formData}
                                    handleSubmit={handleSubmit}
                                    handleInputChange={handleInputChange}
                                    formErrors={formErrors}
                                />
                            </>
                        )}
                        {state.signUp.isLoading && (
                            <CircularProgress size={50} color="primary" />
                        )}
                    </div>

                    <LoginLink navigate={navigate} />
                    <AuthBackground />
                </div>
            </div>
            {/* error modal */}
            <ErrorModal />
            {/* success modal */}
            <SuccessModal formData={formData} />
        </>
    );
}

const pageLayout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: relative;
    gap: 1rem;
    width: 1440px;
`;
const inputLayout = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default RegisterPage;
