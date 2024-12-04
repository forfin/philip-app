import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
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

export default function ImportCSV({ fetchProducts }) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null); // State to hold the selected file
    const [errorMessage, setErrorMessage] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFile(null);
        setErrorMessage("");
    };

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile && uploadedFile.type === "text/csv") {
            setFile(uploadedFile);
            setErrorMessage("");
        } else {
            setErrorMessage("Please upload a valid CSV file.");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setErrorMessage("Please select a CSV file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Make a POST request using axios
            const response = await axios.post("/api/import-csv", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure content-type is set correctly for file upload
                },
            });

            // Handle the response
            console.log("File uploaded successfully:", response.data);

            alert("Data imported successfully!");
            fetchProducts();
        } catch (error) {
            setErrorMessage("An error occurred while uploading the file.");
        }
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                Import CSV
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
                    >
                        Import CSV File
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            type="file"
                            inputProps={{ accept: ".csv" }}
                            onChange={handleFileChange}
                            fullWidth
                        />
                        {errorMessage && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errorMessage}
                            </Typography>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 3,
                            }}
                        >
                            <Button
                                onClick={handleClose}
                                sx={{ mr: 2 }}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpload}
                                variant="contained"
                                color="primary"
                            >
                                Upload
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
