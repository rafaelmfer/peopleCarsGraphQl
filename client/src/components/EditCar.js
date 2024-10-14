import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CAR } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";

function EditCar({ car, people, setEditing }) {
    const [year, setYear] = useState(car.year);
    const [make, setMake] = useState(car.make);
    const [model, setModel] = useState(car.model);
    const [price, setPrice] = useState(car.price);
    const [personId, setPersonId] = useState(car.personId);

    const [updateCar] = useMutation(UPDATE_CAR, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCar({
            variables: {
                id: car.id,
                year: parseInt(year),
                make,
                model,
                price: parseFloat(price),
                personId,
            },
        });
        setEditing(false);
    };

    return (
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
                    {people.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.firstName} {person.lastName}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
                Cancel
            </button>
        </form>
    );
}

export default EditCar;
