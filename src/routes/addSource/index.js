import React from 'react';
// import { graphql } from 'react-apollo';
import { AddSource } from '../../components/AddSource';
import { apolloClient } from '../../App';
import { redditPostsQuery } from '../../graphql/posts';
import type { CardProps } from '../../components/Card';

export class AddSourceWithData extends React.Component {
    state: {
        loading: boolean,
        cards?: CardProps[],
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    async _getRedditData(sub) {
        this.setState({ loading: true });
        const { data: { redditPosts } } = await apolloClient.query({
            query: redditPostsQuery,
            variables: { sub: 'javascript' },
        });
        const cards: CardProps[] = redditPosts.posts;
        this.setState({ cards, loading: false });
    }
    _onUrlChange = (url: string) => {
        this._getRedditData();
    };
    render() {
        const { loading } = this.state;
        return (
            <AddSource
                title="Reddit > Javascript"
                isLoading={loading}
                cards={this.state.cards}
                subscribeToMorePost={() => {}}
                onUrlChange={this._onUrlChange}
            />
        );
    }
}
