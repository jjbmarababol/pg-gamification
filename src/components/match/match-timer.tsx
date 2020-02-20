import { Typography, Row, Col, Button } from "antd";
import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";
import { MatchContext, PlayerContext, IContribution } from "../../contexts";
import { MatchActionButtons } from "../buttons";
import { RoundReward } from "./round-reward";
import { RoundResults } from "./round-results";
import _ from "lodash";

interface IMatchTimer {}

const { Text } = Typography;

export const MatchTimer: FunctionComponent<IMatchTimer> = (props) => {
  const [timer, setTimer] = useState<number>(10);
  const [roundContributions, setRoundCountributions] = useState<
    IContribution[]
  >([]);
  const { updateCoins } = useContext(PlayerContext);
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

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    if (timer === 0) {
      updateCoins(roundReward);
    }
    // eslint-disable-next-line
  }, [timer, roundReward]);

  useEffect(() => {
    setRoundCountributions(contributions);
  }, [contributions]);

  const nextRound = () => {
    setMatchContributions(_.concat(matchContributions, roundContributions));
    if (round < 6) {
      setHasStarted(false);
      setRound(round + 1);
    } else if (round === 6) {
      setIsFinished(true);
    }
  };

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
      {timer === 0 && (
        <>
          <Button
            className="button--match-action"
            type="primary"
            size="large"
            block
            onClick={() => nextRound()}
          >
            Next Round
          </Button>
          <RoundResults />
        </>
      )}
    </>
  );
};
