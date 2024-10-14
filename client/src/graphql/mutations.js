import { gql } from "@apollo/client";

export const ADD_PERSON = gql`
    mutation AddPerson($firstName: String!, $lastName: String!) {
        addPerson(firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;
