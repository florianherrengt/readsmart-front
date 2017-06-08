import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './styles.css';
export type AppLayoutProps = {
    isFirst?: boolean,
    SideMenu: any,
    Header: any,
    Content: any,
};

export const AppLayout = (props: AppLayoutProps) => {
    return (
        <Grid
            style={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <Row>
                <Col sm={3} xsHidden={!props.isFirst} style={{ height: '100vh', padding: 0 }}>
                    {props.SideMenu}
                </Col>
                <Col
                    xsHidden={props.isFirst}
                    sm={9}
                    style={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 0,
                    }}
                >
                    <div style={{ padding: 15, borderBottom: '1px solid lightgray', fontSize: 20 }}>
                        <span className="hidden-sm hidden-md">Back</span>
                        <span style={{ textTransform: 'capitalize' }}>{props.Header}</span>
                    </div>
                    <div style={{ overflow: 'scroll' }}>{props.Content}</div>
                </Col>
            </Row>
        </Grid>
    );
};
