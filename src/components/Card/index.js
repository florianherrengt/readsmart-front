// @flow
import React from 'react';
import './styles.css';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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

const ActionBar = () => (
    <Grid className="actionbar">
        <Row className="show-grid text-center">
            <Col xs={4}>
                <Button>
                    <FontAwesome name="bookmark" />
                    Save
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

export const ReadyCard = ({ title, text }: { title: string, text: string }) => (
    <div className="card">
        <div className="card-content">
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
        <ActionBar />
    </div>
);

export const Card = (
    props: {
        title?: string,
        text?: string,
        isLoading?: boolean,
        showError?: boolean
    }
) => (!props.isLoading ? <ReadyCard {...props} /> : <LoadingCard {...props} />);
