// @flow
import React from 'react';
import type { SourceType } from './index';
import { CardListWithData } from '../../routes/sources/Reddit';
import type { CardProps } from '../Card';

import './styles.css';

export type PreviewProps = {
    type?: SourceType,
    title?: string,
    cards?: CardProps[],
    sub?: string,
};

export const LOGOS = {
    reddit: require('../../assets/logos/rss.png'),
    medium: require('../../assets/logos/medium.png'),
    rss: require('../../assets/logos/rss.png'),
    hackernews: require('../../assets/logos/hackernews.png'),
};

export const Head = (props: { logo: string, title?: string }) =>
    <div className="head">
        <img alt="" src={props.logo} />
        <span>{props.title}</span>
    </div>;

export const Preview = (props: PreviewProps) => {
    // $FlowFixMe
    const logo = LOGOS[props.type];
    return (
        <div className="preview">
            <Head logo={logo} title={props.title} />
            {props.cards && <CardListWithData sub={props.sub} />}
        </div>
    );
};
