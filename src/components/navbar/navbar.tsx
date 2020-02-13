import React, { FunctionComponent, useContext } from "react";
import { Typography, Avatar, Row, Col } from "antd";
import { PlayerContext } from "../../contexts";

const { Text } = Typography;
interface INavbar {}

export const Navbar: FunctionComponent<INavbar> = props => {
  const { playerName, coins } = useContext(PlayerContext);

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
              icon="user"
              size="large"
              style={{ fontSize: 36, background: "#1944a8" }}
            />
            <Text
              className="navbar--player-name text--ellipses"
              style={{ lineHeight: "26px", position: "relative", top: 6 }}
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
              style={{ lineHeight: "26px", position: "relative", top: 6 }}
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
