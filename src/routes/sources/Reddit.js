import React from 'react';
import { gql, graphql } from 'react-apollo';
import { CardList } from '../../components/Card/CardList';
import { redditPostsQuery } from '../../graphql/posts';

export const CardListWithData = graphql(redditPostsQuery, {
    options: ({ sub }) => ({
        variables: { sub },
        notifyOnNetworkStatusChange: true,
    }),
})(props => {
    const { data } = props;

    const subscribeToMorePost = () =>
        data.subscribeToMore({
            document: gql`
                subscription {
                    postAdded {
                        id,
                        title,
                        url,
                        text,
                        short_text,
                        isLoading,
                        created_at
                    }
                }
            `,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                const newFeedItem = subscriptionData.data.postAdded;

                const newRedditPosts = [].concat(prev.redditPosts.posts);
                newRedditPosts[prev.redditPosts.posts.findIndex(post => post.id === newFeedItem.id)] = newFeedItem;

                return Object.assign({}, prev, {
                    redditPosts: {
                        ...prev.redditPosts,
                        count: newRedditPosts.length,
                        posts: newRedditPosts,
                    },
                });
            },
        });

    if (!data.redditPosts || !data.redditPosts.posts) {
        return <CardList subscribeToMorePost={subscribeToMorePost} cards={[{ isLoading: true }]} />;
    }

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
