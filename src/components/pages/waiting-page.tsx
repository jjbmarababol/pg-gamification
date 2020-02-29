import { Avatar, Button, Card, Col, List, Row } from 'antd';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';
import { isUndefined } from 'util';

import { PlayerContext } from '../../contexts';
import { channelAPI, usePlayers } from '../../hooks';
import { LoadingPage } from './loading-page';

type WaitingPageProps = RouteComponentProps;

export const WaitingPage: FunctionComponent<WaitingPageProps> = () => {
  const { channelId } = useParams();
  const { players } = usePlayers(channelId);
  const { updateChannel } = channelAPI;

  const { playerId } = useContext(PlayerContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [channel, setChannel] = useState<string>('');

  useEffect(() => {
    if (!players) {
      setIsLoading(true);
    }
  }, [players]);

  useEffect(() => {
    if (!channelId) {
      return;
    }

    setChannel(channelId);
  }, [channelId]);

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
            title={`${isUndefined(players) ? 0 : players.length}/6 ${
              players.length === 6 ? 'Game Ready!' : 'Waiting for players..'
            } `}
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
                          player.docId === playerId ? 'room__player-self' : ''
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
          {players.length > 1 && (
            <Link to={`/match/${channelId}`}>
              <Button
                type="primary"
                size="large"
                icon="heart"
                block
                onClick={() => {
                  updateChannel({ docId: channel });
                }}
              >
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
