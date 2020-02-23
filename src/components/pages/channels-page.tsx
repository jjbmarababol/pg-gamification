import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
} from "react";
import { List, Card, Col, Row, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { useChannels, channelAPI } from "../../hooks";
import { PlayerContext } from "../../contexts";
import { LoadingPage } from "../pages";

interface IMatchResults extends RouteComponentProps {}

export const ChannelsPage: FunctionComponent<IMatchResults> = (props) => {
  const { history } = props;
  const { addChannels, joinChannel } = channelAPI;
  const { channels } = useChannels();
  const { playerId, setChannelId } = useContext(PlayerContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await addChannels();
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
            style={{ marginBottom: "15px" }}
            className="channel__list"
          >
            <List
              itemLayout="horizontal"
              dataSource={channels}
              renderItem={(channel) => (
                <List.Item
                  actions={[
                    <>
                      <div className="channel__members">
                        {channel.players.length} / 6
                      </div>
                      {channel.players !== undefined &&
                        channel.players.length < 6 && (
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
                      <span style={{ fontWeight: "bolder" }}>
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
