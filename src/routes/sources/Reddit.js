import React from 'react';
import { gql, graphql } from 'react-apollo';
import { CardList } from '../../components/Card/CardList';
import io from 'socket.io-client';
const socket = io('http://readsmart.herokuapp.com');

export const CardListWithData = graphql(
    gql`query ($sub: String!){
        redditPosts(sub: $sub) {
            count,
            posts {
                title
                text
                image
                created_at
            }
        }
    }`,
    {
        options: ({ sub }) => ({
            variables: { sub },
            notifyOnNetworkStatusChange: true
        })
    }
)(({ data }) => {
    socket.on(`new-postsreddit:${data.variables.sub}`, () => data.refetch());
    if (data.loading || (data.redditPosts && !data.redditPosts.posts.length)) {
        return <CardList isLoading />;
    }
    return (
        <CardList
            {...data}
            cards={data.redditPosts.posts.map(post => ({
                ...post,
                text: decodeURIComponent(post.text)
            }))}
        />
    );
});
