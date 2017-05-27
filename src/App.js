// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SideMenu } from './components/SideMenu';
import type { SideMenuProps } from './components/SideMenu';
import './App.css';
import {
    ApolloClient,
    createNetworkInterface,
    ApolloProvider
} from 'react-apollo';
import { CardListWithData } from './routes/sources/Reddit';

class App extends Component {
    _createClient() {
        return new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: 'https://readsmart.herokuapp.com/graphql'
            })
        });
    }
    render() {
        const sideMenuProps: SideMenuProps = {
            groups: ['Reddit'],
            items: [[{ name: 'Javascript' }, { name: 'Python' }]]
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
                                    <SideMenu {...sideMenuProps} {...options}>
                                        <div>No items saved yet</div>
                                    </SideMenu>
                                )}
                            />
                            <Route
                                path="/source/:source/item/:item"
                                component={options => {
                                    const { match } = options;
                                    return (
                                        <SideMenu
                                            {...sideMenuProps}
                                            {...options}
                                        >
                                            <CardListWithData
                                                sub={match.params.item}
                                            />
                                        </SideMenu>
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
