import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

export default function CreateProduct() {
    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("");
    const [color, setColor] = useState(""); // New state for color

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { logout, state, checkToken } = useAuth();

    useEffect(() => {
        checkToken();
    }, []);

    const handleSubmit = async () => {
        const data = {
            name: productName,
            amount: amount,
            unit: unit,
            color: color, // Add color to data
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/productStore`,
                data
            );
            // Reset the form
            setProductName("");
            setAmount("");
            setUnit("");
            setColor(""); // Reset color
            // Close the modal
            handleClose();
            // Show success message
            alert(response.data.message);
        } catch (error) {
            // Check if the error response exists
            if (error.response) {
                console.error("Error response:", error.response);
                alert(
                    error.response.data.message ||
                        "An error occurred while creating the product."
                );
            } else {
                // For network or other errors
                console.error("Error:", error);
                alert("An error occurred while creating the product.");
            }
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Add Product
            </Button>
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
                        gutterBottom
                    >
                        Add New Product
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
                            label="Color" // New color field
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
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
