import { gql } from "react-apollo";

export const redditPostsQuery = gql`
    query ($sub: String!){
        redditPosts(sub: $sub) {
            count,
            posts {
                id,
                title,
                url,
                text,
                short_text,
                isLoading,
                created_at
            }
        }
    }
`;
