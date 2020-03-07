/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Typography } from 'antd';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import { defaultMaxRounds, defaultResultTimeout } from '../../constants';
import { MatchContext, PlayerContext } from '../../contexts';
import { contributionAPI, playerAPI } from '../../hooks';
import { MatchActionButtons } from '../buttons';
import { RoundResults } from './round-results';
import { RoundReward } from './round-reward';

const { Text } = Typography;

export const MatchTimer: FunctionComponent = () => {
  const { updatePlayer } = playerAPI;
  const [timer, setTimer] = useState<number>(3);
  const { useContributions } = contributionAPI;
  const { updateCoins, coins, playerId, channelId } = useContext(PlayerContext);
  const { contributions } = useContributions(channelId);

  const {
    roundReward,
    setHasStarted,
    setIsFinished,
    setRound,
    round,
  } = useContext(MatchContext);

  const nextRound = async () => {
    await updatePlayer({
      docId: playerId,
      coins: coins + roundReward,
      isReady: false,
    });

    // await addtochannel for total contributions
    console.log(contributions);

    if (round < defaultMaxRounds) {
      setHasStarted(false);
      setRound(round + 1);
    } else if (round === defaultMaxRounds) {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    if (timer === 0) {
      updateCoins(roundReward);
      setTimeout(() => {
        nextRound();
      }, defaultResultTimeout);
    }
  }, [timer, roundReward]);

  return (
    <>
      <Row type="flex" align="middle" justify="center">
        <Col span={24} className="card--transluscent">
          {timer !== 0 && (
            <>
              <Text className="text--timer">{timer}</Text>
              <Text className="text--timer text--question">
                Will you contribute to the public pool?
              </Text>
            </>
          )}
          {timer === 0 && <RoundReward reward={roundReward} />}
        </Col>
      </Row>
      {timer !== 0 && <MatchActionButtons />}
      {timer === 0 && <RoundResults />}
    </>
  );
};
