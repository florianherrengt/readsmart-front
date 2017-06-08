// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { AppLayout } from '../components/Layouts';

storiesOf('AppLayout', module)
    .add('with desktop', () => (
        <div>
            <AppLayout />
        </div>
    ))
    .add('with mobile first screen', () => (
        <div>
            <AppLayout isFirst />
        </div>
    ))
    .add('with mobile not first screen', () => (
        <div>
            <AppLayout />
        </div>
    ));
