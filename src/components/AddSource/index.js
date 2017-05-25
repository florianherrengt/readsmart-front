import React from 'react';
import { UrlForm } from './UrlForm';

export class AddSource extends React.Component {
    constructor(
        props: {
            url: string,
            type: 'reddit' | 'medium' | 'hackernews' | 'rss',
            isLoading: boolean
        }
    ) {
        super(props);
    }
    render() {
        return (
            <div>
                <UrlForm
                    value={this.props.url}
                    isLoading={this.props.isLoading}
                />
            </div>
        );
    }
}
