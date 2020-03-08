/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Typography } from 'antd';
import _ from 'lodash';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  defaultMaxPlayers,
  defaultMaxRounds,
  defaultPoolMultiplier,
  defaultResultTimeout,
} from '../../constants';
import { MatchContext, PlayerContext } from '../../contexts';
import { Contribution, contributionAPI, playerAPI } from '../../hooks';
import { MatchActionButtons } from '../buttons';
import { RoundResults } from './round-results';
import { RoundReward } from './round-reward';

const { Text } = Typography;

export const MatchTimer: FunctionComponent = () => {
  const { updatePlayer } = playerAPI;
  const [timer, setTimer] = useState<number>(10);
  const { useContributions } = contributionAPI;
  const { updateCoins, coins, playerId, channelId } = useContext(PlayerContext);
  const {
    roundReward,
    setHasStarted,
    setIsFinished,
    setRound,
    setPoolAmount,
    setTotalAmount,
    setRoundReward,
    round,
  } = useContext(MatchContext);
  const { contributions } = useContributions(channelId, round);

  const computeRewards = (contributions: Contribution[]) => {
    const poolAmount = _.sumBy(contributions, 'amount');
    setPoolAmount(poolAmount);

    const totalAmount = poolAmount * defaultPoolMultiplier;
    setTotalAmount(totalAmount);

    const roundReward = totalAmount / defaultMaxPlayers;
    setRoundReward(roundReward);
  };

  const nextRound = async () => {
    await updatePlayer({
      docId: playerId,
      coins: coins + roundReward,
      isReady: false,
    }).then(() => {
      updateCoins(roundReward);
    });

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
      if (!contributions) {
        return;
      }

      computeRewards(contributions);

      setTimeout(() => {
        nextRound();
      }, defaultResultTimeout);
    }
  }, [timer, roundReward, contributions]);

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
