// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { Login } from '../components/Login';

storiesOf('Login', module).add('with sign in', () => <Login />);
