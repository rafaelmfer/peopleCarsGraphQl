import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <h1>People and Cars</h1>
                                <AddPerson />
                                <AddCar people={data.people} />
                                <PeopleList />
                            </>
                        }
                    />
                    <Route path="/people/:id" element={<ShowPerson />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
