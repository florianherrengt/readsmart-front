// @flow
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Card } from './components/Card';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { SideMenu } from './components/SideMenu';
import { CardList } from './components/Card/CardList';
import './App.css';
import {
    gql,
    ApolloClient,
    createNetworkInterface,
    ApolloProvider,
    graphql
} from 'react-apollo';

const CardListWithData = graphql(
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
    if (!data.redditPosts) {
        return <div />;
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

class App extends Component {
    _createClient() {
        return new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: 'https://readsmart.herokuapp.com/graphql'
            })
        });
    }
    render() {
        return (
            <div className="App">
                <ApolloProvider client={this._createClient()}>
                    <Router>
                        <Route
                            path="/source/:source/item/:item"
                            component={({ match }) => (
                                <SideMenu
                                    groups={['reddit']}
                                    items={[[{ name: 'ja' }]]}
                                >
                                    <CardListWithData sub={match.params.item} />
                                </SideMenu>
                            )}
                        />
                    </Router>
                </ApolloProvider>
            </div>
        );
    }
}

export default App;
