// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './styles.css';
import { Group } from './Group';

export type SideMenuItem = {
    name: string
};

export type SideMenuProps = {
    onItemClick: Function,
    groups: string[],
    items: SideMenuItem[][],
    children?: any
};

export const SideMenu = (props: SideMenuProps) => (
    <div>
        <div className="side-menu">
            <div className="title text-center">ReadSmart</div>
            <div><Button><FontAwesome name="check" />Saved</Button></div>
            <div><Button><FontAwesome name="share" />Shared</Button></div>
            {props.groups.map((groupName, index) => (
                <Group
                    key={index}
                    name={groupName}
                    onItemClick={props.onItemClick}
                    items={props.items[index]}
                />
            ))}
            <div className="side-menu-add-source">
                <div>
                    <Button>Add source</Button>
                </div>
            </div>
        </div>
        {props.children &&
            <div className="side-menu-content">{props.children}</div>}
    </div>
);
