import Navbar from "../../common/Navbar.jsx";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { css } from "@emotion/react";
import { padding } from "@mui/system";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"; // Importing icons
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

import React, { useState, useEffect } from "react";

import CreateProduct from "./components/CreateProduct.jsx";
import EditProduct from "./components/EditProduct.jsx";
import DeleteProduct from "./components/DeleteProduct.jsx";
import axios from "axios";

const LandingPage = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    const [products, setProducts] = useState([]); // Use an array to hold products
    // Fetch products data on component mount
    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BACKEND_URL}/products`
            );
            console.log(response);
            setProducts(response.data.data); // Assuming 'data' holds the products
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Call the fetchProducts function
        console.log(products);
    }, []); // Empty dependency array ensures this runs only once when the component mounts
    return (
        <>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <Box
                    sx={{
                        display: "flex",
                        margin: "20px",
                        justifyContent: "flex-end",
                    }}
                >
                    <CreateProduct />
                </Box>

                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    ID
                                </StyledTableCell>

                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    Product name
                                </StyledTableCell>

                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    Color
                                </StyledTableCell>

                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    Amount
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    Unit
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    Total
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    Created at
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    Updated at
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "20%" }}
                                >
                                    Issue By
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    sx={{ width: "10%" }}
                                >
                                    Manage
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.length === 0 ? (
                                <StyledTableRow>
                                    <StyledTableCell align="center" colSpan={7}>
                                        No data available
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) : (
                                products.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.color}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.amount}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.unit}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.amount * row.unit}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.created_at
                                                ? new Date(
                                                      row.created_at
                                                  ).toLocaleDateString("en-CA")
                                                : "N/A"}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.updated_at
                                                ? new Date(
                                                      row.updated_at
                                                  ).toLocaleDateString("en-CA")
                                                : "N/A"}
                                        </StyledTableCell>

                                        <TableCell align="center">
                                            {row.updated_by_name &&
                                            row.updated_by
                                                ? `${row.updated_by_name} (ID = ${row.updated_by.id})`
                                                : "Unknown"}
                                        </TableCell>

                                        <StyledTableCell
                                            align="center"
                                            sx={{
                                                display: "flex",
                                                gap: "10px",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <EditProduct
                                                id={row.id}
                                                fetchProducts={fetchProducts}
                                            />

                                            <DeleteProduct
                                                id={row.id}
                                                fetchProducts={fetchProducts}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default LandingPage;
