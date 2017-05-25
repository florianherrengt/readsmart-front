import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import loremIpsum from 'lorem-ipsum';

import { Card } from '../components/Card';

export const LoremCard = () => (
    <Card title={loremIpsum({ count: 1 })} text={loremIpsum({ count: 5 })} />
);

storiesOf('Card', module)
    .add('with title and text', () => (
        <div>
            <LoremCard />
            <LoremCard />
            <LoremCard />
            <LoremCard />
        </div>
    ))
    .add('with loading true', () => (
        <div>
            <Card isLoading />
            <Card isLoading />
            <Card isLoading />
            <Card isLoading />
        </div>
    ));
