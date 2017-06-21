// @flow
import React from 'react';
import normalizeUrl from 'normalize-url';
import { UrlForm } from './UrlForm';
import { Preview } from './Preview';
import type { CardProps } from '../Card';

export type SourceType = 'reddit' | 'medium' | 'hackernews' | 'rss';

export type AddSourceProps = {
    url?: string,
    type?: SourceType,
    isLoading?: boolean,
    title?: string,
    cards?: CardProps[],
    onUrlChange: Function,
    onSave: Function,
    sub?: string,
};

export const getSourceType = (url: string): { type?: string, name?: string } => {
    const { hostname } = new URL(url);
    const knownDomains = {
        'www.reddit.com': 'reddit',
        'reddit.com': 'reddit',
        'news.ycombinator.com': 'hackernews',
        'medium.com': 'medium',
    }[hostname];
    if (knownDomains) {
        if (knownDomains === 'reddit') {
            const sub = url.split('/').slice(-1)[0];
            return { type: 'reddit', sub, name: sub };
        }
        return { type: knownDomains };
    }
    if (hostname.split('.')[0] === 'medium') {
        return { type: 'medium' };
    }
    return {};
};

export class AddSource extends React.Component {
    state: {
        url: string,
    };
    // eslint-disable-next-line
    constructor(props: AddSourceProps) {
        super(props);
    }
    render() {
        return (
            <div>
                <UrlForm
                    value={this.props.url}
                    isLoading={this.props.isLoading}
                    onChange={url => this.props.onUrlChange(normalizeUrl(url))}
                    onSave={url => {
                        const { type, name } = getSourceType(normalizeUrl(url));
                        this.props.onSave({ type, name, url });
                    }}
                />
                {this.props.title &&
                    <Preview
                        type={this.props.type}
                        sub={this.props.sub}
                        title={this.props.title}
                        cards={this.props.cards}
                    />}
            </div>
        );
    }
}
