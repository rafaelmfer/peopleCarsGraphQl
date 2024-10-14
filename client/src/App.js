import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Typography, Divider } from "@mui/material";
import PeopleList from "./components/PeopleList";
import AddPerson from "./components/AddPerson";
import AddCar from "./components/AddCar";
import ShowPerson from "./components/ShowPerson";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "./graphql/queries";

function App() {
    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Router>
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    People and Their Cars
                </Typography>
                <Divider style={{ marginBottom: "20px" }} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <AddPerson />
                                <AddCar people={data.people} />
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    style={{
                                        marginTop: "20px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Records
                                </Typography>
                                <PeopleList />
                            </>
                        }
                    />
                    <Route path="/people/:id" element={<ShowPerson />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
