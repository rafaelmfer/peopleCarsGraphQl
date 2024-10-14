import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
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
