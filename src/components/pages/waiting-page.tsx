import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
} from "react";
import { List, Card, Col, Row, Button } from "antd";
import { RouteComponentProps, useParams, Link } from "react-router-dom";
import { getPlayersByChannel, usePlayers } from "../../hooks";
import { PlayerContext } from "../../contexts";
import { isUndefined } from "util";
import { LoadingPage } from "./loading-page";

interface IWaitingPageProps extends RouteComponentProps {}

export const WaitingPage: FunctionComponent<IWaitingPageProps> = (props) => {
  const { channelId = "blue-shark" } = useParams();
  const { history } = props;
  const { players } = usePlayers(channelId);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!players) {
      setIsLoading(true);
    }
    console.log(players);
  }, [players]);

  // useEffect(() => {
  //   (async () => {
  //     if (!channelId) {
  //       return;
  //     }
  //   })();
  // }, [channelId]);

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
            title={`${isUndefined(players) ? 0 : players.length}/6 Waiting.. `}
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
                        {player.name}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
          {players.length !== 6 && (
            <Link to={`/match/${channelId}`}>
              <Button>Enter</Button>
            </Link>
          )}
        </Col>
      </Row>
    );
  }
  return Page;
};
