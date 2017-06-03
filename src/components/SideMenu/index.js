// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './styles.css';
import { Group } from './Group';
import MobileDetect from 'mobile-detect';
const mobileDetect = new MobileDetect(window.navigator.userAgent);

export type SideMenuItem = {
    name: string
};

export type SideMenuProps = {
    onItemClick?: Function,
    groups: string[],
    items: SideMenuItem[][],
    children?: any,
    history?: any,
    root?: boolean
};

export const SideMenu = (props: SideMenuProps) => {
    if (!props.children && props.groups && props.items && props.history) {
        props.history.push(
            `/source/${props.groups[0]}/item/${props.items[0][0].name}`
        );
    }
    if (mobileDetect.mobile() && !props.root && props.children) {
        return (
            <div style={{ margin: 10, overflowX: 'hidden' }}>
                {props.children}
            </div>
        );
    }
    return (
        <div>
            <div
                className="side-menu"
                style={{
                    width: mobileDetect.mobile() && props.root ? '100%' : ''
                }}
            >
                <div className="side-menu-list">
                    <div className="title text-center">ReadSmart</div>
                    <div>
                        <Button><FontAwesome name="check" />Saved</Button>
                    </div>
                    <div>
                        <Button><FontAwesome name="share" />Shared</Button>
                    </div>
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
                </div>
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
