import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";
import { List, Card, Col, Row, Button } from "antd";
import { RouteComponentProps, useParams, Link } from "react-router-dom";
import { usePlayers } from "../../hooks";
import { isUndefined } from "util";
import { LoadingPage } from "./loading-page";
import { PlayerContext } from "../../contexts";

interface IWaitingPageProps extends RouteComponentProps {}

export const WaitingPage: FunctionComponent<IWaitingPageProps> = (props) => {
  const { channelId = "blue-shark" } = useParams();
  const { players } = usePlayers(channelId);
  const { playerId } = useContext(PlayerContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
            style={{ marginBottom: "15px" }}
            title={`${isUndefined(players) ? 0 : players.length}/6 ${
              players.length === 6 ? "Game Ready!" : "Waiting.."
            } `}
            className="channel__list"
          >
            <List
              itemLayout="horizontal"
              dataSource={players}
              renderItem={(player) => (
                <List.Item actions={[<p>Ready</p>]}>
                  <List.Item.Meta
                    title={
                      <span style={{ fontWeight: "bolder" }}>
                        {`${player.name} ${
                          player.docId === playerId ? "(You)" : ""
                        }`}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
          {players.length === 6 && (
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
