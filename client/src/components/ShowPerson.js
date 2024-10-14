import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../graphql/queries";

function ShowPerson() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const person = data.person;

    return (
        <div>
            <h1>
                {person.firstName} {person.lastName}
            </h1>
            <h3>Cars:</h3>
            <ul>
                {person.cars.map((car) => (
                    <li key={car.id}>
                        {car.year} {car.make} {car.model} - ${car.price}
                    </li>
                ))}
            </ul>
            <Link to="/">Go Back Home</Link>
        </div>
    );
}

export default ShowPerson;
