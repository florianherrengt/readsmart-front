// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import loremIpsum from 'lorem-ipsum';

import { AddSource } from '../components/AddSource';
import { generateCardProps } from './CardList';
storiesOf('AddSource', module).add('with no value', () => (
    <div>
        <AddSource />
    </div>
));
storiesOf('AddSource', module).add('with loading', () => (
    <div>
        <AddSource url="http://myurl.com" isLoading />
    </div>
));
storiesOf('AddSource', module).add('with invalid url', () => (
    <div>
        <AddSource url="invalid url" />
    </div>
));
storiesOf('AddSource', module).add('with valid reddit url', () => (
    <div>
        <AddSource
            url="http://myurl.com"
            type="reddit"
            title="Javascript"
            cards={generateCardProps()}
        />
    </div>
));
storiesOf('AddSource', module).add('with valid hacknews url', () => (
    <div>
        <AddSource
            url="http://myurl.com"
            type="hackernews"
            title="Hackernews"
            cards={generateCardProps()}
        />
    </div>
));
storiesOf('AddSource', module).add('with valid medium url', () => (
    <div>
        <AddSource
            url="http://myurl.com"
            type="medium"
            title="Free Code Camp"
            cards={generateCardProps()}
        />
    </div>
));
storiesOf('AddSource', module).add('with valid rss url', () => (
    <div>
        <AddSource
            url="http://myurl.com"
            type="rss"
            title="My RSS Feed"
            cards={generateCardProps()}
        />
    </div>
));
