// @flow
import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export type GroupItemProps = {
    groupName: string,
    name: string,
};

export const GroupItem = (props: GroupItemProps) =>
    <ListGroupItem>
        <Link className="item-text" to={`/source/${props.groupName}/item/${props.name}`}>
            <Button>{props.name}</Button>
        </Link>
    </ListGroupItem>;
