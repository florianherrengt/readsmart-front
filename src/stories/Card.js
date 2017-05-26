// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import loremIpsum from 'lorem-ipsum';

import { Card } from '../components/Card';

export const LoremCard = (props: { saved?: boolean }) => (
    <Card
        title={loremIpsum({ count: 1 })}
        text={loremIpsum({ count: 5 })}
        {...props}
    />
);

storiesOf('Card', module)
    .add('with title and text', () => (
        <div>
            <LoremCard />
        </div>
    ))
    .add('with saved', () => (
        <div>
            <LoremCard saved />
        </div>
    ))
    .add('with loading true', () => (
        <div>
            <Card isLoading />
        </div>
    ));
