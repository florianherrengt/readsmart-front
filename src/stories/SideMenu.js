// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { SideMenu } from '../components/SideMenu';
import type { SideMenuProps, SideMenuItem } from '../components/SideMenu';
import { generateCardProps } from './CardList';
import { CardList } from '../components/Card/CardList';

const redditItems: SideMenuItem[] = [
    {
        name: 'Javascript'
    },
    {
        name: 'Python'
    }
];
const mediumItems: SideMenuItem[] = [
    {
        name: 'Udacity'
    },
    {
        name: 'Freecodecamp'
    }
];
storiesOf('SideMenu', module).add('with a few sources', () => (
    <SideMenu
        onItemClick={item => console.log('item clicked', item)}
        groups={['Reddit', 'Medium']}
        items={[redditItems, mediumItems]}
        children={<CardList cards={generateCardProps()} />}
    />
));
