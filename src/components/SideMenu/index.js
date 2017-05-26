// @flow
import React from 'react';
import FontAwesome from 'react-fontawesome';
import './styles.css';
import { Group } from './Group';
// import type { GroupProps } from './Group';

export type SideMenuItem = {
    name: string
};

export type SideMenuProps = {
    onItemClick: Function,
    groups: string[],
    items: SideMenuItem[][]
};

export const SideMenu = (props: SideMenuProps) => (
    <div className="side-menu">
        <div className="title text-center">ReadSmart</div>
        {props.groups.map((groupName, index) => (
            <Group
                key={index}
                name={groupName}
                onItemClick={props.onItemClick}
                items={props.items[index]}
            />
        ))}
    </div>
);
