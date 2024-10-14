import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PERSON } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";

function AddPerson() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [addPerson] = useMutation(ADD_PERSON, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName && lastName) {
            addPerson({ variables: { firstName, lastName } });
            setFirstName("");
            setLastName("");
        }
    };

    const isFormValid = firstName && lastName;

    return (
        <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h6">Add Person</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                    <TextField
                        label="First Name *"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        label="Last Name *"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        style={{ height: "100%" }}
                    >
                        Add Person
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddPerson;
