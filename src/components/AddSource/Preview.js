// @flow
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import type { SourceType } from './index';
import { CardList } from '../Card/CardList';
import type { CardProps } from '../Card';

import './styles.css';

export type PreviewProps = {
    type?: SourceType,
    title?: string,
    cards?: CardProps[]
};

export const LOGOS = {
    reddit: require('../../../public/logos/reddit.png'),
    medium: require('../../../public/logos/medium.png'),
    rss: require('../../../public/logos/rss.png'),
    hackernews: require('../../../public/logos/hackernews.png')
};

export const Head = (props: { logo: string, title?: string }) => (
    <div className="head">
        <img src={props.logo} />
        <span>{props.title}</span>
    </div>
);

export const Preview = (props: PreviewProps) => {
    // $FlowFixMe
    const logo = LOGOS[props.type];
    return (
        <div className="preview">
            <Head logo={logo} title={props.title} />
            {props.cards && <CardList cards={props.cards} />}
        </div>
    );
};
