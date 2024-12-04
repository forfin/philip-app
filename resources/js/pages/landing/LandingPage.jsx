import Navbar from "../../common/Navbar.jsx";
import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import CreateProduct from "./components/CreateProduct.jsx";
import EditProduct from "./components/EditProduct.jsx";
import DeleteProduct from "./components/DeleteProduct.jsx";
import ImportCSV from "./components/ImportCSV.jsx";
import axios from "axios";
import DataTable from "react-data-table-component";

const LandingPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10); // Number of items per page
    const [search, setSearch] = useState(""); // Search term
    const [sortColumn, setSortColumn] = useState("id"); // Default sort column
    const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction

    // Fetch products data
    const fetchProducts = async (
        page = 1,
        perPage = 10,
        search = "",
        sortColumn = "id",
        sortDirection = "asc"
    ) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BACKEND_URL}/products`,
                {
                    params: {
                        page,
                        per_page: perPage,
                        search,
                        sort_column: sortColumn,
                        sort_direction: sortDirection,
                    },
                }
            );
            setProducts(response.data.data);
            setCurrentPage(response.data.current_page);
            setTotalRows(response.data.total);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, perPage, search, sortColumn, sortDirection);
    }, [currentPage, perPage, search, sortColumn, sortDirection]);

    // Custom handlers
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to the first page
    };

    const handleSort = (column, direction) => {
        setSortColumn(column.sortField || column.selector); // Use sortField if defined, otherwise selector
        setSortDirection(direction);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Columns for DataTable
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
            center: true,
        },
        {
            name: "Product Name",
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
            center: true,
        },
        {
            name: "Color",
            selector: (row) => row.color,
            sortable: true,
            sortField: "color",
            center: true,
        },
        {
            name: "Amount",
            selector: (row) => row.amount,
            sortable: true,
            sortField: "amount",
            center: true,
        },
        {
            name: "Unit",
            selector: (row) => row.unit,
            sortable: true,
            sortField: "unit",
            center: true,
        },
        {
            name: "Total",
            selector: (row) => row.amount * row.unit,
            center: true,
        },
        {
            name: "Created At",
            selector: (row) =>
                row.created_at
                    ? new Date(row.created_at).toLocaleDateString("en-CA")
                    : "N/A",
            center: true,
        },
        {
            name: "Updated At",
            selector: (row) =>
                row.updated_at
                    ? new Date(row.updated_at).toLocaleDateString("en-CA")
                    : "N/A",
            center: true,
        },
        {
            name: "Issue By",
            selector: (row) =>
                row.updated_by_name && row.updated_by
                    ? `${row.updated_by_name} (ID = ${row.updated_by.id})`
                    : "Unknown",
            center: true,
        },
        {
            name: "Manage",
            cell: (row) => (
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                    }}
                >
                    <EditProduct id={row.id} fetchProducts={fetchProducts} />
                    <DeleteProduct id={row.id} fetchProducts={fetchProducts} />
                </Box>
            ),
            center: true,
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <Box
                    sx={{
                        display: "flex",
                        margin: "20px",
                        justifyContent: "space-between",
                        gap: "20px",
                    }}
                >
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={search}
                        onChange={handleSearch}
                        sx={{ width: "500px" }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            margin: "20px",
                            justifyContent: "space-between",
                            gap: "20px",
                        }}
                    >
                        <CreateProduct fetchProducts={fetchProducts} />
                        <ImportCSV fetchProducts={fetchProducts} />
                    </Box>
                </Box>

                <DataTable
                    stripedRows
                    title="Products"
                    columns={columns}
                    data={products}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]} // Allow custom items per page
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    onSort={handleSort}
                    highlightOnHover
                />
            </div>
        </>
    );
};

export default LandingPage;
