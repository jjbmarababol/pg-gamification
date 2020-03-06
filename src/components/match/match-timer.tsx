import { Col, Row, Typography } from 'antd';
import _ from 'lodash';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import { defaultMaxRounds, defaultResultTimeout } from '../../constants';
import { Contribution, MatchContext, PlayerContext } from '../../contexts';
import { playerAPI } from '../../hooks';
import { MatchActionButtons } from '../buttons';
import { RoundResults } from './round-results';
import { RoundReward } from './round-reward';

const { Text } = Typography;

export const MatchTimer: FunctionComponent = () => {
  const { updatePlayer } = playerAPI;
  const [timer, setTimer] = useState<number>(10);
  const [roundContributions, setRoundCountributions] = useState<Contribution[]>(
    [],
  );
  const { updateCoins, coins, playerId } = useContext(PlayerContext);
  const {
    roundReward,
    setHasStarted,
    setIsFinished,
    setRound,
    round,
    contributions,
    matchContributions,
    setMatchContributions,
  } = useContext(MatchContext);

  const nextRound = async () => {
    await updatePlayer({
      docId: playerId,
      coins: coins + roundReward,
      isReady: false,
    });

    setMatchContributions(_.concat(matchContributions, roundContributions));
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
    // eslint-disable-next-line
  }, [timer, roundReward]);

  useEffect(() => {
    setRoundCountributions(contributions);
  }, [contributions]);

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
