import { gql } from 'react-apollo';

export const currentUser = gql`
    query {
        currentUser {
            id,
            username
        }
    }
`;
