// @flow
import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './styles.css';
import { Group } from './Group';

export type SideMenuItem = {
    name: string,
};

export type SideMenuProps = {
    onItemClick?: Function,
    groups: string[],
    items: SideMenuItem[][],
    children?: any,
    history?: any,
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
                {props.groups.map((groupName, index) => (
                    <Group key={index} name={groupName} items={props.items[index]} />
                ))}
            </div>
            <ListGroup className="bottom-actions">
                <ListGroupItem>
                    <Button><FontAwesome name="plus" />Add source</Button>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
};
