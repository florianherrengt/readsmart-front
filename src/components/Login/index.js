import React from 'react';
import { graphql } from 'react-apollo';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './styles.css';
import { CardLayout } from '../Layouts';
import { currentUser } from '../../graphql/user';

export type LoginProps = {
    twitterUrl: string,
    next: string,
};

export const Login = (props: LoginProps) =>
    <div className="login">
        {!props.data.loading &&
            !props.data.currentUser &&
            <CardLayout>
                <div className="content">
                    <p>Sign in to personalise your feed</p>
                    <a href={props.twitterUrl}>
                        <Button bsStyle="link" className="btn-social btn-twitter" block>
                            <FontAwesome name="twitter" /> Sign in with Twitter
                        </Button>
                    </a>
                </div>
            </CardLayout>}
    </div>;

export const LoginWithData = graphql(currentUser)(Login);
