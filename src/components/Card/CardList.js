// @flow
import React from 'react';
import { Card } from './index';
import type { CardProps } from './index';
import './styles.css';

export type CardListProps = {
    cards?: CardProps[],
    isLoading?: boolean
};
export const CardList = (props: CardListProps) => {
    console.log(props);
    return (
        <div className="card-list">
            {props.cards
                ? props.cards.map((cardProps, index) => (
                      <Card key={index} {...cardProps} />
                  ))
                : Array(10)
                      .fill('')
                      .map((_, index) => <Card key={index} isLoading />)}
        </div>
    );
};
