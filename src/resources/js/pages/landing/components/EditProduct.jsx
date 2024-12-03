import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Edit as EditIcon } from "@mui/icons-material"; // Importing icons
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useAuth } from "../../../contexts/authentication";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function EditProduct({ id, fetchProducts }) {
    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("");
    const [color, setColor] = useState(""); // Add color state
    const { logout, state, checkToken } = useAuth();

    // Open the modal
    const handleOpen = async () => {
        setOpen(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BACKEND_URL}/products/${id}`
            );
            const product = response.data.data;
            setProductName(product.name);
            setAmount(product.amount);
            setUnit(product.unit);
            setColor(product.color); // Set initial color value
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        const data = {
            name: productName,
            amount: amount,
            unit: unit,
            color: color, // Update the color as well
        };

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_APP_BACKEND_URL}/productStore/${id}`,
                data
            );
            alert(response.data.message);
            handleClose(); // Close the modal after successful update
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Error updating product.");
        }
    };

    return (
        <div>
            <IconButton onClick={handleOpen} color="primary">
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit Product
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Amount"
                            type="number"
                            variant="outlined"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Unit"
                            variant="outlined"
                            type="number"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Color"
                            variant="outlined"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Issue By" // New created by field
                            variant="outlined"
                            value={`${state.user?.name} (ID=${state.user?.id})`} // Display the user's name and ID
                            fullWidth
                            InputProps={{
                                readOnly: true, // Make the field read-only
                                disabled: true, // Disable editing the field
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <Button variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                color="primary"
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
