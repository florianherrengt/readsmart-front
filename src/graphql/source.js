import { gql } from "react-apollo";

export const allSourcesQuery = gql`
    query {
        allSources {
            count,
            sources {
            id,
            url,
            type,
            name
            }
        }
    }
`;

export const addSourceMutation = gql`
    mutation ($url: String!, $type: SourceType!, $name: String!){
        addSource(url: $url, type: $type, name: $name) {
            id,
            url,
            type
        }
    }
`;
