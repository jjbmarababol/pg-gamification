import { Button, Card, Col, Icon, Row, Typography } from 'antd';
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
              <Title level={4}>Therefore:</Title>
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
              <Title level={3} style={{ textAlign: 'center' }}>
                Imagine if 8 out of 10 contribute
              </Title>
              <div style={{ display: 'flex' }}>
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
              </div>
              <div style={{ display: 'flex' }}>
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#F58233' }}
                  type="user-delete"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#F58233' }}
                  type="user-delete"
                />
              </div>
              <div>
                <Title
                  level={4}
                  style={{ textAlign: 'center', marginTop: '15px' }}
                >
                  = 80 x 2 = 160/ 10 players = 16 + whatever amount they have
                  kept{' '}
                </Title>
              </div>
              <div>
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user"
                />{' '}
                <span style={{ fontSize: '25px' }}>only has 16 coins</span>
                <br />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#F58233' }}
                  type="user"
                />{' '}
                <span style={{ fontSize: '25px' }}>has 26 coins</span>
              </div>
              <div>
                <Title
                  level={3}
                  style={{
                    textAlign: 'center',
                    marginTop: '15px',
                    color: '#F58233',
                  }}
                >
                  Cooperators get less than the free-riders
                </Title>
              </div>
            </Card>

            <Card style={{ margin: '35px 0 15px' }}>
              <Title level={3} style={{ textAlign: 'center' }}>
                Imagine if everyone contributes
              </Title>
              <div style={{ display: 'flex' }}>
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
              </div>
              <div style={{ display: 'flex' }}>
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
                <Icon
                  theme="outlined"
                  style={{ fontSize: '40px', flexGrow: 1, color: '#005BBB' }}
                  type="user-add"
                />
              </div>
              <div>
                <Title
                  level={4}
                  style={{ textAlign: 'center', marginTop: '15px' }}
                >
                  = 100 x 2 = 200/ 10 players = 20 Payoff{' '}
                </Title>
              </div>
              <div>
                <Title
                  level={3}
                  style={{
                    textAlign: 'center',
                    marginTop: '15px',
                    color: '#005BBB',
                  }}
                >
                  PAYOFF = 20
                </Title>
              </div>
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
