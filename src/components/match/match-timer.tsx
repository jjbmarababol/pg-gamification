import { Typography, Row, Col, Button } from 'antd';
import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import { MatchContext, PlayerContext } from '../../contexts';
import { MatchActionButtons } from '../buttons';
import { RoundReward } from './round-reward';
import { MatchResults } from './match-results';

interface IMatchTimer {}

const { Text } = Typography;

export const MatchTimer: FunctionComponent<IMatchTimer> = (props) => {

  const [timer, setTimer] = useState<number>(5);
  const { setCoins } = useContext(PlayerContext);
  const { roundReward, setHasStarted, setRound, round } = useContext(MatchContext);

  useEffect(()=> {
    if(timer > 0){
      setTimeout(()=>{
        setTimer(timer-1);
      }, 1000);
    }

    if(timer === 0) {
      setCoins(roundReward);
    }
  },[timer, roundReward]);

  const nextRound = () => {
    setHasStarted(false);
    setRound(round+1);
  };

  return (<>
    <Row type='flex' align="middle" justify="center">
      <Col span={24} className='col--match-action-question'>
        { timer !== 0 && <>
          <Text className='text--timer'>{timer}</Text>
          <Text className='text--timer text--question'>Will you contribute to the public pool?</Text>
        </> }
        { timer === 0 && <RoundReward reward={roundReward}/> }
      </Col>
    </Row>
    { timer !== 0 &&<MatchActionButtons /> }
    { timer === 0 && <>
      <Button className='button--match-action' type='primary' size="large" block onClick={()=>nextRound()}>Next Round</Button>
      <MatchResults/>
    </>}
  </>);
};