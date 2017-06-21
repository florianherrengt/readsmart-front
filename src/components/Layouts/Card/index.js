import React, { ReactChildren } from 'react';
import './styles.css';

export type CardLayoutProps = {
    children: ReactChildren,
};

export const CardLayout = (props: CardLayoutProps) =>
    <div className="card">
        {props.children}
    </div>;
