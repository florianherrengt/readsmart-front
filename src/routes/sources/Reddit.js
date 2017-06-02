import React from 'react';
import { gql, graphql } from 'react-apollo';
import { CardList } from '../../components/Card/CardList';
import throttle from 'lodash.throttle';

export const CardListWithData = graphql(
    gql`query ($sub: String!){
        redditPosts(sub: $sub) {
            count,
            posts {
                id,
                title,
                url,
                text,
                short_text,
                isLoading
            }
        }
    }`,
    {
        options: ({ sub }) => ({
            variables: { sub },
            notifyOnNetworkStatusChange: true
        })
    }
)(props => {
    const { data, iot } = props;
    iot.getClient().on(
        'message',
        throttle(topic => {
            data.refetch();
        }, 1000)
    );
    if (!data.redditPosts || !data.redditPosts.posts) {
        return <CardList cards={[{ isLoading: true }]} />;
    }

    return (
        <CardList
            {...data}
            cards={data.redditPosts.posts.map(post => ({
                ...post,
                text: post.text
            }))}
        />
    );
});
