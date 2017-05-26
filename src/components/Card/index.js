// @flow
import React from 'react';
import './styles.css';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export type CardProps = {
    title?: string,
    text?: string,
    isLoading?: boolean,
    showError?: boolean,
    saved?: boolean
};

export const LoadingCard = () => (
    <div className="card">
        <div className="loading loading-title" />
        <div className="loading loading-text" />
        <div className="loading loading-text" />
        <div className="loading loading-text" />
        <div className="loading loading-text" />
        <div className="loading loading-text" />
    </div>
);

export type ActionBarProps = {
    saved?: boolean
};

const ActionBar = ({ saved }: ActionBarProps) => (
    <Grid className="actionbar">
        <Row className="show-grid text-center">
            <Col xs={4}>
                <Button>
                    <FontAwesome name={saved ? 'check' : 'bookmark'} />
                    {saved ? 'Saved' : 'Save'}
                </Button>
            </Col>

            <Col xs={4}>
                <Button>
                    <FontAwesome
                        style={{ fontSize: 20 }}
                        name="caret-square-o-down"
                    />
                </Button>
            </Col>
            <Col xs={4}>
                <Button>
                    <FontAwesome name="share" />
                    Share
                </Button>
            </Col>
        </Row>
    </Grid>
);

export const ReadyCard = ({ title, text, saved }: CardProps) => (
    <div className="card">
        <div className="card-content text-left">
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
        <ActionBar saved={saved} />
    </div>
);

export const Card = (props: CardProps) =>
    (!props.isLoading ? <ReadyCard {...props} /> : <LoadingCard {...props} />);
