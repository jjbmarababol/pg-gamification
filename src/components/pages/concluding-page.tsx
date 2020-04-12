import { Button, Card, Col, Row, Typography } from 'antd';
import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  conclustionDescription,
  summaryDescription,
} from '../../constants/summary-constants';
import { SummaryList } from '../conclusion';
const { Title } = Typography;

export const ConcludingPage: FunctionComponent<RouteComponentProps> = (
  props,
) => {
  const { history } = props;
  const [isConclusion, setIsConclusion] = useState<boolean>(false);
  return (
    <Row
      className="row--moving-background"
      type="flex"
      justify="center"
      align="middle"
    >
      {isConclusion && (
        <>
          <Col xs={20} md={10}>
            <Card style={{ margin: '35px 0 15px' }}>
              <Title level={4}>
                Let’s look at the math and see which works best
              </Title>
              {conclustionDescription.map((description, idx) => (
                <SummaryList
                  key={idx}
                  header={description.header}
                  items={description.items}
                />
              ))}
            </Card>

            <Button
              type="primary"
              size="large"
              onClick={() => history.push('/')}
              block
            >
              Exit
            </Button>
          </Col>
        </>
      )}
      {!isConclusion && (
        <>
          <Col xs={20} md={10}>
            <Card style={{ margin: '35px 0 15px' }}>
              <Title level={4}>
                Let’s look at the math and see which works best
              </Title>
              {summaryDescription.map((description, idx) => (
                <SummaryList
                  key={idx}
                  header={description.header}
                  items={description.items}
                />
              ))}
            </Card>

            <Button
              type="primary"
              size="large"
              onClick={() => setIsConclusion(true)}
              block
            >
              Next
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};
