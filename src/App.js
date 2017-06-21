// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SideMenuWithData } from './components/SideMenu';
import { AppLayout } from './components/Layouts';
import FontAwesome from 'react-fontawesome';

import './App.css';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { LoginWithData } from './components/Login';
import { CardListWithData } from './routes/sources/Reddit';
import { AddSourceWithData } from './routes/addSource';

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_ROOT_URL);

const ROOT_URL = process.env.REACT_APP_ROOT_URL || 'localhost:8000';
const PROTOCOL = process.env.REACT_APP_PROTOCOL || 'http';

const networkInterface = createNetworkInterface({
    uri: `${PROTOCOL}://${ROOT_URL}/graphql`,
    opts: {
        credentials: 'include',
    },
});

const wsClient = new SubscriptionClient(`ws://${ROOT_URL}/subscriptions`, {
    reconnect: true,
    connectionParams: {
        authToken: 'dd',
    },
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

export const apolloClient = new ApolloClient({
    dataIdFromObject: o => o.id,
    networkInterface: networkInterfaceWithSubscriptions,
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <ApolloProvider client={apolloClient}>
                    <Router>
                        <div>
                            <Route
                                exact
                                path="/"
                                component={options =>
                                    <AppLayout
                                        isFirst
                                        SideMenu={<SideMenuWithData root={true} />}
                                        Header={'Saved'}
                                        Content={<div />}
                                    />}
                            />
                            <Route
                                path="/source/:source/item/:item"
                                component={options => {
                                    const { match } = options;
                                    return (
                                        <AppLayout
                                            SideMenu={<SideMenuWithData root={true} />}
                                            Header={[
                                                <span key={1}>{match.params.source}</span>,
                                                <FontAwesome key={2} style={{ margin: '0 10px' }} name="angle-right" />,
                                                <span key={3}>{match.params.item}</span>,
                                            ]}
                                            Content={
                                                <div>
                                                    <LoginWithData
                                                        twitterUrl={`${PROTOCOL}://${ROOT_URL}/login/twitter`}
                                                    />
                                                    <CardListWithData sub={match.params.item} />
                                                </div>
                                            }
                                            {...options}
                                        />
                                    );
                                }}
                            />
                            <Route
                                path="/addsource"
                                component={options => {
                                    return (
                                        <AppLayout
                                            SideMenu={<SideMenuWithData root={true} />}
                                            Header={<div>Add Source</div>}
                                            Content={<AddSourceWithData {...options} />}
                                            {...options}
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
