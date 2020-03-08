/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Col, Row, Typography } from 'antd';
import _ from 'lodash';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { defaultMaxPlayers, defaultMaxRounds } from '../../constants';
import { MatchContext, PlayerContext } from '../../contexts';
import { channelAPI, Player, playerAPI } from '../../hooks';
import { MatchResults, MatchTimer } from '../match';
import { Navbar } from '../navbar';
import { LoadingPage } from './loading-page';

const { Text, Title } = Typography;

export const MatchPage: FunctionComponent = () => {
  const { channelId } = useParams();

  const { getPlayer, updatePlayer, usePlayers } = playerAPI;
  const { players: channelPlayers } = usePlayers(channelId);
  const { getChannel, updateChannel } = channelAPI;

  const {
    isFinished,
    setIsFinished,
    setHasStarted,
    round,
    setRound,
    hasStarted,
  } = useContext(MatchContext);
  const {
    playerId,
    updateCoins,
    coins,
    setIsReady,
    isReady = false,
    setCoins,
  } = useContext(PlayerContext);
  const [players, setPlayers] = useState<Player[]>();

  const countReady = (channelPlayers: Player[]): number => {
    return _.filter(channelPlayers, (player) => {
      return player.isReady;
    }).length;
  };

  const readyAndStarted = async (): Promise<void> => {
    setIsReady(true);
    await updatePlayer({
      docId: playerId,
      isReady: true,
      coins: coins + 10,
    }).then(() => {
      updateCoins(10);
    });
  };

  useEffect(() => {
    if (!playerId) {
      return;
    }

    (async (): Promise<void> => {
      const playerData = await getPlayer(playerId);

      if (!playerData) {
        return;
      }

      const { coins, isReady: ready } = playerData;

      setCoins(coins);
      setIsReady(ready);
    })();
  }, [isReady, hasStarted]);

  useEffect(() => {
    (async () => {
      if (!channelId) {
        return;
      }

      const channelData = await getChannel(channelId);

      if (!channelData) {
        return;
      }

      const { hasStarted: starting, currentRound } = channelData;

      setRound(currentRound);
      setHasStarted(starting);

      if (currentRound > defaultMaxRounds) {
        setIsFinished(true);
      }
    })();
  }, [hasStarted]);

  useEffect(() => {
    if (!channelPlayers) {
      return;
    }
    setPlayers(channelPlayers);
    const readyPlayers = countReady(channelPlayers);

    if (readyPlayers === defaultMaxPlayers) {
      (async () => {
        await updateChannel({ docId: channelId, hasStarted: true });
        setHasStarted(true);
      })();
    }

    if (readyPlayers === 0) {
      (async () => {
        if (!hasStarted) {
          return;
        }
        await updateChannel({
          docId: channelId,
          hasStarted: false,
          currentRound: round + 1,
        });
        setHasStarted(false);
      })();
    }
  }, [channelPlayers]);

  if (!players) {
    return <LoadingPage />;
  } else
    return (
      <div className="row--moving-background">
        <Navbar />
        <Row
          style={{ minHeight: '80vh' }}
          type="flex"
          justify="center"
          align="middle"
        >
          {!isFinished && (
            <>
              {!hasStarted && (
                <>
                  <Col span={20} lg={12}>
                    <Row type="flex" justify="center" align="middle">
                      <Col xs={22} md={16} className="card--transluscent">
                        <Text
                          className="text--timer"
                          style={{ letterSpacing: '-5px' }}
                        >
                          Round {round}
                        </Text>
                        <Text style={{ display: 'block', textAlign: 'center' }}>
                          You currently have
                        </Text>
                        <Title
                          style={{
                            display: 'block',
                            textAlign: 'center',
                            marginTop: 0,
                          }}
                        >
                          {coins}{' '}
                          <Avatar
                            icon="copyright"
                            size="large"
                            className="status-icon--coins"
                          />
                        </Title>
                        <Button
                          className="button--match-action"
                          disabled={isReady}
                          type="primary"
                          icon="heart"
                          size="large"
                          onClick={async () => await readyAndStarted()}
                          block
                        >
                          {isReady
                            ? `${countReady(
                                players,
                              )}/${defaultMaxPlayers} players are ready`
                            : 'Ready'}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </>
              )}
              {hasStarted && (
                <Col span={20} lg={12}>
                  <MatchTimer />
                </Col>
              )}
            </>
          )}
          {isFinished && (
            <Col span={20} lg={12}>
              <MatchResults />
            </Col>
          )}
        </Row>
      </div>
    );
};
