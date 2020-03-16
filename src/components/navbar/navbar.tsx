import { Avatar, Col, Row, Typography } from 'antd';
import _ from 'lodash';
import React, { FunctionComponent, useContext } from 'react';

import { PlayerContext } from '../../contexts';

const { Text } = Typography;

export const Navbar: FunctionComponent = () => {
  const { playerName, coins, profileImage } = useContext(PlayerContext);

  return (
    <>
      <nav>
        <Row
          className="navbar--match"
          type="flex"
          align="middle"
          justify="center"
        >
          <Col span={12}>
            <Avatar
              src={require(`../ui/images/profile/${profileImage}`)}
              style={{ position: 'relative', top: -10 }}
            />
            <Text
              className="navbar--player-name text--ellipses"
              style={{
                fontSize: 20,
                lineHeight: '45px',
                position: 'relative',
                top: 5,
              }}
            >
              {playerName}
            </Text>
          </Col>
          <Col span={12}>
            <Avatar
              icon="copyright"
              size="large"
              className="status-icon--coins"
            />
            <Text
              className="navbar--player-name text--ellipses"
              style={{
                lineHeight: '32px',
                position: 'relative',
                top: 9,
                fontWeight: 'bolder',
                color: '#ffd500',
              }}
            >
              {_.round(coins, 2)}
            </Text>
          </Col>
        </Row>
      </nav>
      <div className="navbar--clearfix" />
    </>
  );
};
