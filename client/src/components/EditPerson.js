import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";

function EditPerson({ person, setEditing }) {
    const [firstName, setFirstName] = useState(person.firstName);
    const [lastName, setLastName] = useState(person.lastName);

    const [updatePerson] = useMutation(UPDATE_PERSON, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePerson({ variables: { id: person.id, firstName, lastName } });
        setEditing(false);
    };

    return (
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
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
                Cancel
            </button>
        </form>
    );
}

export default EditPerson;
