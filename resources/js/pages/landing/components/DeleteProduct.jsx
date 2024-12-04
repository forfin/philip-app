import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"; // Importing icons
import Button from "@mui/material/Button";
import axios from "axios";
import IconButton from "@mui/material/IconButton";

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

export default function DeleteProduct({ id, fetchProducts }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_APP_BACKEND_URL}/products/${id}`
            );
            alert(response.data.message); // Success message from the backend
            handleClose(); // Close modal after successful deletion
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product.");
        }
    };

    return (
        <div>
            <IconButton onClick={handleOpen} color="secondary">
                <DeleteIcon />
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
                        Delete Product
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this product? This
                        action cannot be undone.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <Button
                            onClick={handleClose}
                            color="primary"
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            color="secondary"
                            variant="contained"
                        >
                            Confirm Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
