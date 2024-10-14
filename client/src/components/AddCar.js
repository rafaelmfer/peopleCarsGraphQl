import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CAR } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";
import {
    TextField,
    Button,
    Grid,
    Box,
    MenuItem,
    Typography,
    InputAdornment,
} from "@mui/material";

function AddCar({ people }) {
    const [year, setYear] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [personId, setPersonId] = useState("");

    const [addCar] = useMutation(ADD_CAR, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (year && make && model && price && personId) {
            addCar({
                variables: {
                    year: parseInt(year),
                    make,
                    model,
                    price: parseFloat(price),
                    personId,
                },
            });
            setYear("");
            setMake("");
            setModel("");
            setPrice("");
            setPersonId("");
        }
    };

    const isFormValid = year && make && model && price && personId;

    return (
        <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h6">Add Car</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Year *"
                        fullWidth
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Make *"
                        fullWidth
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        label="Model *"
                        fullWidth
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Price *"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        select
                        label="Person *"
                        fullWidth
                        value={personId}
                        onChange={(e) => setPersonId(e.target.value)}
                    >
                        {people &&
                            people.map((person) => (
                                <MenuItem key={person.id} value={person.id}>
                                    {person.firstName} {person.lastName}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Add Car
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddCar;
