// @flow
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { GroupItem } from './Item';

import type { SideMenuItem } from './index';

export type GroupProps = {
    name: string,
    expanded?: boolean,
    onItemClick: Function,
    items: SideMenuItem[]
};

export class Group extends React.Component {
    state: { expanded?: boolean };
    constructor(props: GroupProps) {
        super(props);
        this.state = { expanded: props.expanded || true };
    }
    render() {
        const { expanded } = this.state;
        return (
            <div className="group">
                <Button
                    className="group-name"
                    onClick={() => this.setState({ expanded: !expanded })}
                >
                    <FontAwesome
                        name={expanded ? 'caret-down' : 'caret-right'}
                    />
                    {this.props.name}
                </Button>
                {expanded &&
                    <div className="group-items">
                        {this.props.items.map((itemProps, index) => (
                            <GroupItem
                                key={index}
                                {...itemProps}
                                onClick={this.props.onItemClick}
                            />
                        ))}
                    </div>}
            </div>
        );
    }
}
