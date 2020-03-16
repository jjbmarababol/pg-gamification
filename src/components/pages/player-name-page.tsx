import { Button, Col, Icon, Input, Row, Typography } from 'antd';
import _ from 'lodash';
import React, {
  ChangeEvent,
  FunctionComponent,
  useContext,
  useState,
} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { PlayerContext } from '../../contexts';
import { playerAPI } from '../../hooks';
import { LoadingPage } from '../pages';

const { Title } = Typography;

type PlayerNamePage = RouteComponentProps;

export const PlayerNamePage: FunctionComponent<PlayerNamePage> = (props) => {
  const { history } = props;
  const { addPlayer } = playerAPI;
  const {
    playerName,
    setPlayerName,
    setPlayerId,
    setProfileImage,
  } = useContext(PlayerContext);
  const [player, setPlayer] = useState<string>(playerName);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPlayerNameFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  const savePlayer = (playerName: string) => {
    if (!playerName.length) {
      return;
    }
    setIsLoading(true);
    const profileImage = `fish-${_.random(1, 6)}.svg`;

    setPlayerName(playerName);
    setProfileImage(profileImage);

    addPlayer(playerName, profileImage).then((result) => {
      setPlayerId(result.id);
      setIsLoading(false);
      history.push('/channels');
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <Row
        className="row--moving-background"
        type="flex"
        justify="center"
        align="middle"
      >
        <Col xs={20} md={10}>
          <div className="card--transluscent">
            <Title level={3} className="centered text--transluscent-slim">
              Player Name
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Input
                  size="large"
                  placeholder="Player name here"
                  value={player}
                  prefix={<Icon type="user" />}
                  onChange={onPlayerNameFieldChange}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Button
                  type="primary"
                  icon="save"
                  size="large"
                  block
                  onClick={() => savePlayer(player)}
                >
                  Save
                </Button>
              </Col>
              <Col xs={24}>
                <Link to="/">
                  <Button type="danger" icon="close" size="large" block>
                    Exit
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
};
