// @flow
import React from 'react';
import { UrlForm } from './UrlForm';
import { Preview } from './Preview';
import type { CardProps } from '../Card';
export type SourceType = 'reddit' | 'medium' | 'hackernews' | 'rss';

export type AddSourceProps = {
    url?: string,
    type?: SourceType,
    isLoading?: boolean,
    title?: string,
    cards?: CardProps[]
};

export class AddSource extends React.Component {
    constructor(props: AddSourceProps) {
        super(props);
    }
    render() {
        return (
            <div>
                <UrlForm
                    value={this.props.url}
                    isLoading={this.props.isLoading}
                />
                {this.props.title &&
                    <Preview
                        type={this.props.type}
                        title={this.props.title}
                        cards={this.props.cards}
                    />}
            </div>
        );
    }
}
