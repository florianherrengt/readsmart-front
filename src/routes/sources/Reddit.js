import React from 'react';
import { gql, graphql } from 'react-apollo';
import { CardList } from '../../components/Card/CardList';
// import throttle from 'lodash.throttle';

let refetchCount = 0;

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
            notifyOnNetworkStatusChange: true,
        }),
    },
)(props => {
    const { data, iot } = props;
    iot &&
        iot.getClient().on('message', () => {
            refetchCount++;
            if (refetchCount < 5) {
                data.refetch();
            }
        });
    if (!data.redditPosts || !data.redditPosts.posts) {
        return <CardList cards={[{ isLoading: true }]} />;
    }

    const subscribeToMorePost = data.subscribeToMore({
        document: gql`
                    subscription {
                        postAdded {
                            id
                        }
                    }
                `,
        updateQuery: (prev, { subscriptionData }) => {
            console.log('subscribeToMorePost', subscriptionData);
        },
    });

    return (
        <CardList
            {...data}
            subscribeToMorePost={subscribeToMorePost}
            cards={data.redditPosts.posts.map(post => ({
                ...post,
                text: post.text,
            }))}
        />
    );
});
