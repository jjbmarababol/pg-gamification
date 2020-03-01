import { Avatar, Button, Card, Col, List, Row } from 'antd';
import _ from 'lodash';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';

import { defaultMaxPlayers } from '../../constants';
import { PlayerContext } from '../../contexts';
import { usePlayers } from '../../hooks';
import { LoadingPage } from './loading-page';

type WaitingPageProps = RouteComponentProps;

export const WaitingPage: FunctionComponent<WaitingPageProps> = () => {
  const { channelId } = useParams();
  const { players } = usePlayers(channelId);

  const { playerId } = useContext(PlayerContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createTitle = (): string => {
    const status =
      players?.length === defaultMaxPlayers
        ? 'Game Ready!'
        : 'Waiting for players..';

    const playerCount = `${
      _.isUndefined(players) ? 0 : players.length
    }/${defaultMaxPlayers}`;

    return `${playerCount} ${status} `;
  };

  useEffect(() => {
    if (!players) {
      setIsLoading(true);
    }
  }, [players]);

  let Page = <></>;

  if (!players || isLoading) {
    Page = <LoadingPage />;
  }

  if (players) {
    Page = (
      <Row
        className="row--moving-background"
        type="flex"
        justify="center"
        align="middle"
      >
        <Col xs={20} md={10}>
          <Card
            bordered={false}
            title={createTitle()}
            className="card--transluscent no-padding"
          >
            <List
              itemLayout="horizontal"
              dataSource={players}
              renderItem={(player) => (
                <List.Item
                  actions={[
                    <Avatar
                      key={player.docId}
                      src={require(`../ui/images/profile/${player.profileImage}`)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <span
                        className={
                          player.docId === playerId
                            ? 'room__player room__player-self'
                            : 'room__player'
                        }
                      >
                        {player.name}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
          {players.length === defaultMaxPlayers && (
            <Link to={`/match/${channelId}`}>
              <Button type="primary" size="large" icon="heart" block>
                Enter
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    );
  }
  return Page;
};
