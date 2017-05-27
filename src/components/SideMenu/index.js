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
    onItemClick?: Function,
    groups: string[],
    items: SideMenuItem[][],
    children?: any,
    history?: any
};

export const SideMenu = (props: SideMenuProps) => {
    if (!props.children && props.groups && props.items && props.history) {
        props.history.push(
            `/source/${props.groups[0]}/item/${props.items[0][0].name}`
        );
    }
    return (
        <div>
            <div className="side-menu">
                <div className="title text-center">ReadSmart</div>
                <div><Button><FontAwesome name="check" />Saved</Button></div>
                <div><Button><FontAwesome name="share" />Shared</Button></div>
                {props.groups.map((groupName, index) => (
                    <Group
                        key={index}
                        name={groupName}
                        onItemClick={item => {
                            props.history &&
                                props.history.push(
                                    `/source/${groupName}/item/${item.name}`
                                );
                            props.onItemClick && props.onItemClick(item);
                        }}
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
};
