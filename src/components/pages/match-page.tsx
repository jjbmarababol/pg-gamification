import { Avatar, Button, Col, Row, Typography } from 'antd';
import React, { FunctionComponent, useContext } from 'react';

import { MatchContext, PlayerContext } from '../../contexts';
import { MatchResults, MatchTimer } from '../match';
import { Navbar } from '../navbar';

const { Text, Title } = Typography;
export const MatchPage: FunctionComponent = () => {
  const {
    setHasStarted,
    isFinished,
    hasStarted,
    round,
    randomizeContribution,
  } = useContext(MatchContext);
  const { updateCoins, coins } = useContext(PlayerContext);
  const readyAndStarted = () => {
    updateCoins(10);
    randomizeContribution();
    setHasStarted(true);
  };

  return (
    <div className="row--moving-background">
      <Navbar />
      <Row
        style={{ minHeight: '80vh' }}
        type="flex"
        justify="center"
        align="middle"
      >
        {!isFinished && (
          <>
            {!hasStarted && (
              <Col span={20} lg={12}>
                <Row type="flex" justify="center" align="middle">
                  <Col xs={22} md={16} className="card--transluscent">
                    <Text
                      className="text--timer"
                      style={{ letterSpacing: '-5px' }}
                    >
                      Round {round}
                    </Text>
                    <Text style={{ display: 'block', textAlign: 'center' }}>
                      You currently have
                    </Text>
                    <Title
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        marginTop: 0,
                      }}
                    >
                      {coins}{' '}
                      <Avatar
                        icon="copyright"
                        size="large"
                        className="status-icon--coins"
                      />
                    </Title>
                    <Button
                      className="button--match-action"
                      type="primary"
                      icon="heart"
                      size="large"
                      onClick={() => readyAndStarted()}
                      block
                    >
                      Ready
                    </Button>
                  </Col>
                </Row>
              </Col>
            )}
            {hasStarted && (
              <Col span={20} lg={12}>
                <MatchTimer />
              </Col>
            )}
          </>
        )}
        {isFinished && (
          <Col span={20} lg={12}>
            <MatchResults />
          </Col>
        )}
      </Row>
    </div>
  );
};
