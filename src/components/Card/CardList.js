// @flow
import React from 'react';
import { Card } from './index';
import type { CardProps } from './index';
import './styles.css';

export type CardListProps = {
    cards: CardProps[]
};
export const CardList = (props: CardListProps) => (
    <div className="card-list">
        {props.cards.map((cardProps, index) => <Card {...cardProps} />)}
    </div>
);
