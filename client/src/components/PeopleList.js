import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PEOPLE = gql`
    query GetPeople {
        people {
            id
            firstName
            lastName
            cars {
                id
                make
                model
                price
            }
        }
    }
`;

function PeopleList() {
    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>People</h2>
            {data.people.map((person) => (
                <div
                    key={person.id}
                    style={{
                        border: "1px solid #ccc",
                        margin: "10px",
                        padding: "10px",
                    }}
                >
                    <h3>
                        {person.firstName} {person.lastName}
                    </h3>
                    <h4>Cars:</h4>
                    <ul>
                        {person.cars.map((car) => (
                            <li key={car.id}>
                                {car.make} {car.model} - ${car.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default PeopleList;
