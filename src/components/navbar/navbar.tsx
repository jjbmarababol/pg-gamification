import { Avatar, Col, Row, Typography } from 'antd';
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
            <Avatar src={require(`../ui/images/profile/${profileImage}`)} />
            <Text
              className="navbar--player-name text--ellipses"
              style={{ lineHeight: '26px', position: 'relative', top: 6 }}
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
              style={{ lineHeight: '26px', position: 'relative', top: 6 }}
            >
              {coins}
            </Text>
          </Col>
        </Row>
      </nav>
      <div className="navbar--clearfix" />
    </>
  );
};
