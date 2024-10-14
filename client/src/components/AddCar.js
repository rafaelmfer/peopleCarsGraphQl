import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CAR } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";

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

    return (
        <div>
            <h2>Add Car</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Year: </label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div>
                    <label>Make: </label>
                    <input
                        type="text"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                    />
                </div>
                <div>
                    <label>Model: </label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div>
                    <label>Price: </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>Owner: </label>
                    <select
                        value={personId}
                        onChange={(e) => setPersonId(e.target.value)}
                    >
                        <option value="">Select Owner</option>
                        {people &&
                            people.map((person) => (
                                <option key={person.id} value={person.id}>
                                    {person.firstName} {person.lastName}
                                </option>
                            ))}
                    </select>
                </div>
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
}

export default AddCar;
