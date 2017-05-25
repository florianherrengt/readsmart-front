import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import loremIpsum from 'lorem-ipsum';

import { AddSource } from '../components/AddSource';

storiesOf('AddSource', module).add('with no value', () => (
    <div>
        <AddSource />
    </div>
));
storiesOf('AddSource', module).add('with invalid url', () => (
    <div>
        <AddSource url="invalid url" />
    </div>
));
storiesOf('AddSource', module).add('with valid url', () => (
    <div>
        <AddSource url="http://myurl.com" />
    </div>
));
storiesOf('AddSource', module).add('with loading', () => (
    <div>
        <AddSource url="http://myurl.com" isLoading />
    </div>
));
