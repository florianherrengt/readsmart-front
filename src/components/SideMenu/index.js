// @flow
import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import './styles.css';
import { Group } from './Group';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { allSourcesQuery } from '../../graphql/source';
import { currentUser } from '../../graphql/user';

export type SideMenuItem = {
    name: string,
};

export type SideMenuProps = {
    onItemClick?: Function,
    groups: string[],
    items: SideMenuItem[][],
    children?: any,
    history?: any,
    data?: {
        loading: boolean,
    },
};

export const SideMenu = (props: SideMenuProps) => {
    return (
        <div className="side-menu">
            <div className="side-menu-list">
                <div className="title text-center">ReadSmart</div>
                <ListGroup>
                    <ListGroupItem>
                        <Button><FontAwesome name="check" />Saved</Button>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button><FontAwesome name="share" />Shared</Button>
                    </ListGroupItem>
                </ListGroup>
                <div>
                    {props.groups &&
                        props.groups.map((groupName, index) =>
                            <Group key={index} name={groupName} items={props.items[index]} />,
                        )}
                </div>
                <ListGroup className="bottom-actions">
                    <ListGroupItem>
                        <Link to="/addsource">
                            <Button><FontAwesome name="plus" />Add source</Button>
                        </Link>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </div>
    );
};

export const SideMenuWithData = compose(
    graphql(currentUser),
    graphql(allSourcesQuery, {
        props: props => {
            const { data: { allSources } } = props;
            if (!allSources) {
                return props;
            }
            const { sources } = allSources;
            const groups = Object.keys(_.groupBy(sources, 'type'));
            const items = groups.map(key => sources.filter(source => source.type === key));
            return { groups, items };
        },
    }),
)(SideMenu);
