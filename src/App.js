// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SideMenu } from './components/SideMenu';
import type { SideMenuProps } from './components/SideMenu';
import { AppLayout } from './components/Layouts';
import FontAwesome from 'react-fontawesome';

import './App.css';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { CardListWithData } from './routes/sources/Reddit';

const ROOT_URL = 'localhost:8000';
const PROTOCOL = 'http';

const networkInterface = createNetworkInterface({
    uri: `${PROTOCOL}://${ROOT_URL}/graphql`,
});

const wsClient = new SubscriptionClient(`ws://${ROOT_URL}/subscriptions`, {
    reconnect: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

class App extends Component {
    _createClient() {
        return new ApolloClient({
            networkInterface: networkInterfaceWithSubscriptions,
        });
    }
    render() {
        const sideMenuProps: SideMenuProps = {
            groups: ['Reddit'],
            items: [[{ name: 'Javascript' }, { name: 'Python' }]],
        };
        return (
            <div className="App">
                <ApolloProvider client={this._createClient()}>
                    <Router>
                        <div>
                            <Route
                                exact
                                path="/"
                                component={options => (
                                    <AppLayout
                                        isFirst
                                        SideMenu={[<SideMenu root={true} {...sideMenuProps} />]}
                                        Header={'Saved'}
                                        Content={<div />}
                                    />
                                )}
                            />
                            <Route
                                path="/source/:source/item/:item"
                                component={options => {
                                    const { match } = options;
                                    return (
                                        <AppLayout
                                            SideMenu={<SideMenu root={true} {...sideMenuProps} />}
                                            Header={[
                                                match.params.source,
                                                <FontAwesome style={{ margin: '0 10px' }} name="angle-right" />,
                                                match.params.item,
                                            ]}
                                            Content={<CardListWithData sub={match.params.item} />}
                                        />
                                    );
                                }}
                            />
                        </div>
                    </Router>
                </ApolloProvider>
            </div>
        );
    }
}

export default App;
