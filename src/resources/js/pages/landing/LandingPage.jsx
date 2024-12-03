import Navbar from "../../common/Navbar.jsx";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Box, Button } from "@mui/material";

import React, { useState, useEffect } from "react";

import CreateProduct from "./components/CreateProduct.jsx";
import EditProduct from "./components/EditProduct.jsx";
import DeleteProduct from "./components/DeleteProduct.jsx";
import ImportCSV from "./components/ImportCSV.jsx";
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

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(10); // Number of items per page

    // Fetch products data on component mount
    const fetchProducts = async (page = 1) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BACKEND_URL}/products`,
                {
                    params: {
                        page: page,
                        per_page: perPage,
                    },
                }
            );
            setProducts(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            setTotal(response.data.total);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Call the fetchProducts function on mount or page change
    }, [perPage]); // Effect runs when perPage changes

    useEffect(() => {
        fetchProducts(currentPage); // Fetch products whenever the page number changes
    }, [currentPage]);

    // Handle page changes
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle per-page changes
    const handlePerPageChange = (event) => {
        setPerPage(event.target.value);
        setCurrentPage(1); // Reset to the first page when per-page is changed
    };
    return (
        <>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <Box
                    sx={{
                        display: "flex",
                        margin: "20px",
                        justifyContent: "flex-end",
                        gap: "20px",
                    }}
                >
                    <CreateProduct />
                    <ImportCSV fetchProducts={fetchProducts} />
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

                {/* Pagination controls */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                    }}
                >
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span>{`Page ${currentPage} of ${lastPage}`}</span>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                    >
                        Next
                    </Button>
                </Box>
            </div>
        </>
    );
};

export default LandingPage;
