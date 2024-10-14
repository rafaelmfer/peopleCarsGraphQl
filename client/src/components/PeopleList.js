import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PEOPLE } from "../graphql/queries";
import { DELETE_PERSON, DELETE_CAR } from "../graphql/mutations";
import EditPerson from "./EditPerson";
import EditCar from "./EditCar";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const formatCurrency = (price) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};

function PeopleList() {
    const { loading, error, data } = useQuery(GET_PEOPLE);
    const [deletePerson] = useMutation(DELETE_PERSON, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });
    const [deleteCar] = useMutation(DELETE_CAR, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });
    const [editingPersonId, setEditingPersonId] = useState(null);
    const [editingCarId, setEditingCarId] = useState(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleDeletePerson = (id) => {
        deletePerson({ variables: { id } });
    };

    const handleDeleteCar = (id) => {
        deleteCar({ variables: { id } });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {data.people.map((person) => (
                <Card variant="outlined" key={person.id}>
                    <CardContent>
                        {editingPersonId === person.id ? (
                            <EditPerson
                                person={person}
                                setEditing={() => setEditingPersonId(null)}
                            />
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="h5" component="div">
                                        {person.firstName} {person.lastName}
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                setEditingPersonId(person.id)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() =>
                                                handleDeletePerson(person.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography
                                    variant="h6"
                                    sx={{ marginTop: "10px" }}
                                >
                                    Cars:
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                        marginBottom: "16px",
                                    }}
                                >
                                    {person.cars.map((car) => (
                                        <Box
                                            key={car.id}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            {editingCarId === car.id ? (
                                                <EditCar
                                                    car={car}
                                                    people={data.people}
                                                    setEditing={() =>
                                                        setEditingCarId(null)
                                                    }
                                                />
                                            ) : (
                                                <>
                                                    <Typography>
                                                        {car.year} {car.make}{" "}
                                                        {car.model} -{" "}
                                                        {formatCurrency(
                                                            car.price
                                                        )}
                                                    </Typography>
                                                    <Box>
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() =>
                                                                setEditingCarId(
                                                                    car.id
                                                                )
                                                            }
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            color="secondary"
                                                            onClick={() =>
                                                                handleDeleteCar(
                                                                    car.id
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                    ))}
                                </Box>

                                <Link
                                    to={`/people/${person.id}`}
                                    style={{
                                        textDecoration: "none",
                                        marginTop: "10px",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="info"
                                        fullWidth
                                    >
                                        Learn More
                                    </Button>
                                </Link>
                            </>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default PeopleList;
