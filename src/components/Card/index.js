// @flow
import React from 'react';
import './styles.css';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export type CardProps = {
    title?: string,
    text?: string,
    short_text?: string,
    url?: string,
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
    saved?: boolean,
    onMoreClick: Function
};

const ActionBar = (props: ActionBarProps) => (
    <Grid className="actionbar">
        <Row className="show-grid text-center">
            <Col xs={4}>
                <Button>
                    <FontAwesome name={props.saved ? 'check' : 'bookmark'} />
                    {props.saved ? 'Saved' : 'Save'}
                </Button>
            </Col>

            <Col xs={4}>
                <Button onClick={() => props.onMoreClick()}>
                    <FontAwesome
                        style={{ fontSize: 20 }}
                        name={`caret-square-o-${props.expanded ? 'up' : 'down'}`}
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

export class ReadyCard extends React.Component {
    state: { expanded: boolean };
    constructor(props: CardProps) {
        super(props);
        this.state = { expanded: false };
    }
    _splitText(text: string) {
        return text.split('\n').map((item, key) => {
            return <span key={key}>{item}<br /></span>;
        });
    }
    _renderLongText() {
        const { text } = this.props;
        return text ? this._splitText(text) : this._renderShortText();
    }
    _renderShortText() {
        const { short_text } = this.props;
        return short_text ? this._splitText(short_text) : '';
    }
    render() {
        const { title, url, saved } = this.props;
        return (
            <div className="card">
                <div className="card-content text-left">
                    <h1><a href={url}>{title}</a></h1>
                    {this.state.expanded
                        ? this._renderLongText()
                        : this._renderShortText()}
                </div>
                <ActionBar
                    saved={saved}
                    expanded={this.state.expanded}
                    onMoreClick={() =>
                        this.setState({
                            expanded: !this.state.expanded
                        })}
                />
            </div>
        );
    }
}

export const Card = (props: CardProps) =>
    (!props.isLoading ? <ReadyCard {...props} /> : <LoadingCard {...props} />);
