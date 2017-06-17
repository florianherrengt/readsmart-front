// @flow
import React from 'react';
import { Card } from './index';
import type { CardProps } from './index';
import './styles.css';
import { gql } from 'react-apollo';

export type CardListProps = {
    cards?: CardProps[],
    isLoading?: boolean,
    subscribeToMorePost: Function,
};
export class CardList extends React.Component {
    constructor(props: CardListProps) {
        super(props);
    }
    componentWillMount() {
        this.props.subscribeToMorePost();
    }
    render() {
        return (
            <div className="card-list">
                {this.props.cards
                    ? this.props.cards.map((cardProps, index) => <Card key={index} {...cardProps} />)
                    : Array(10).fill('').map((_, index) => <Card key={index} isLoading />)}
            </div>
        );
    }
}
