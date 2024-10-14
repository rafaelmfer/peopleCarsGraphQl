import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PERSON } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";

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

    return (
        <div>
            <h2>Add Person</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name: </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button type="submit">Add Person</button>
            </form>
        </div>
    );
}

export default AddPerson;
