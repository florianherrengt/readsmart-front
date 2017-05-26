// @flow
import React from 'react';
import { Button } from 'react-bootstrap';

export type GroupItemProps = {
    name: string,
    onClick: Function
};

export const GroupItem = (props: GroupItemProps) => (
    <div>
        <Button onClick={() => props.onClick(props)}>{props.name}</Button>
    </div>
);
