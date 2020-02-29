import { Button, Card, Col, List, Row } from 'antd';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { PlayerContext } from '../../contexts';
import { channelAPI, useChannels } from '../../hooks';
import { LoadingPage } from '../pages';

type MatchResults = RouteComponentProps;

export const ChannelsPage: FunctionComponent<MatchResults> = (props) => {
  const { history } = props;
  const { addChannels, joinChannel } = channelAPI;
  const { channels } = useChannels();
  const { playerId, setChannelId } = useContext(PlayerContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await addChannels();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    })();
  }, [addChannels]);

  const selectChannel = async (channelId: string) => {
    if (!channels || playerId.length === 0) {
      return;
    }
    setIsLoading(true);

    return await joinChannel(channelId, playerId).then(() => {
      setChannelId(channelId);

      setIsLoading(false);
      history.push(`/room/${channelId}`);
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
          <Card
            bordered={false}
            title="Select Channel"
            className="card--transluscent no-padding"
          >
            <List
              itemLayout="horizontal"
              dataSource={channels}
              renderItem={(channel) => (
                <List.Item
                  actions={[
                    <>
                      <div className="channel__members">
                        {channel.players?.length} / 2
                      </div>
                      {channel.players !== undefined &&
                        channel.players?.length < 100 && (
                          <Button
                            type="primary"
                            onClick={() => selectChannel(channel.docId)}
                          >
                            Enter
                          </Button>
                        )}
                    </>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <span style={{ fontWeight: 'bolder' }}>
                        {channel.name}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    );
  }
};
