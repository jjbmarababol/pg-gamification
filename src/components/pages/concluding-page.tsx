import { Button, Col, Row, Typography } from 'antd';
import React, { FunctionComponent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const ConcludingPage: FunctionComponent<RouteComponentProps> = (
  props,
) => {
  const { history } = props;
  return (
    <Row
      className="row--moving-background"
      type="flex"
      justify="center"
      align="middle"
    >
      <Col xs={20} md={10}>
        <div
          className="card--transluscent"
          style={{ textAlign: 'center', margin: '35px 0 15px' }}
        >
          <Title level={3}>Sustainable Fishing: A Cooperative Dilemma</Title>
          <Paragraph className="conclusion-circle">
            Individually, I do better if I fish however I want (inside NTZs,
            using more efficient gear, etc.). I get more for my family.
          </Paragraph>
          <Paragraph
            className="conclusion-circle"
            style={{ backgroundColor: '#2da066' }}
          >
            But as a whole, we all do better if we all cooperate. Habitat and
            fish can recover faster, we can share costs and efficiencies
          </Paragraph>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={() => history.push('/')}
          block
        >
          Exit
        </Button>
      </Col>
    </Row>
  );
};
