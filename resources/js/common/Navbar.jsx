/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import sitterlogo from "../picture/sitter-logo.svg";
import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import axios from "axios";

import { BsFillPersonFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlinePets } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";

function Navbar() {
    const navigate = useNavigate();
    const { logout, state, checkToken } = useAuth();

    useEffect(() => {
        checkToken();
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
            `}
        >
            <div
                css={css`
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 0px;
                    width: 1140px;
                `}
            >
                <div
                    onClick={() => {
                        navigate("/web/home");
                        window.location.reload();
                    }}
                    css={css`
                        &:hover {
                            cursor: pointer;
                        }
                    `}
                >
                    <img src={sitterlogo} alt="Sitter Logo" />
                </div>
                <div
                    css={css`
                        display: flex;
                        gap: 1rem;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {state.isAuthenticated ? (
                        <>
                            <button
                                css={css`
                                    width: 40px;
                                    height: 40px;
                                    cursor: pointer;
                                    border-radius: 100%;
                                    object-fit: cover;
                                    background-color: gray;
                                `}
                                onClick={handleClick}
                            />

                            <div>{state.user?.name}</div>
                            <div>{state.user?.email}</div>

                            {state.isAuthenticated && (
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "fade-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            logout();
                                        }}
                                        css={petSitterMenuItemStyle}
                                    >
                                        <RiLogoutBoxRLine />
                                        Log out
                                    </MenuItem>
                                </Menu>
                            )}
                        </>
                    ) : (
                        <div
                            css={css`
                                &:hover {
                                    cursor: pointer;
                                }
                            `}
                            onClick={() => {
                                navigate("/web/login");
                            }}
                        >
                            <div>Login</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const petOwnerMenuItemStyle = css`
    display: flex;
    gap: 10px;
    width: 186px;
    padding-left: 30px;
    font-size: 18px;

    &:hover {
        color: rgb(255, 112, 55);
    }
`;

const petSitterMenuItemStyle = css`
    display: flex;
    gap: 20px;
    width: 230px;
    padding-left: 30px;
    font-size: 18px;

    &:hover {
        color: rgb(255, 112, 55);
    }
`;

export default Navbar;
