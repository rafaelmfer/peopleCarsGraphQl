import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PEOPLE } from "../graphql/queries";
import { DELETE_PERSON, DELETE_CAR } from "../graphql/mutations";
import EditPerson from "./EditPerson";
import EditCar from "./EditCar";

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
                    {editingPersonId === person.id ? (
                        <EditPerson
                            person={person}
                            setEditing={() => setEditingPersonId(null)}
                        />
                    ) : (
                        <>
                            <h3>
                                {person.firstName} {person.lastName}
                            </h3>
                            <h4>Cars:</h4>
                            <ul>
                                {person.cars.map((car) => (
                                    <li key={car.id}>
                                        {editingCarId === car.id ? (
                                            <EditCar
                                                car={car}
                                                people={data.people} // Passando as pessoas para o dropdown do dono
                                                setEditing={() =>
                                                    setEditingCarId(null)
                                                }
                                            />
                                        ) : (
                                            <>
                                                {car.make} {car.model} - $
                                                {car.price}
                                                <button
                                                    onClick={() =>
                                                        setEditingCarId(car.id)
                                                    }
                                                >
                                                    Edit Car
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteCar(car.id)
                                                    }
                                                >
                                                    Delete Car
                                                </button>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => setEditingPersonId(person.id)}
                            >
                                Edit Person
                            </button>
                            <button
                                onClick={() => handleDeletePerson(person.id)}
                            >
                                Delete Person
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PeopleList;
