import { Typography, Row, Col, Button } from 'antd';
import React, { FunctionComponent, useEffect, useState } from 'react';

interface IMatchTimer {}

const { Text } = Typography;

export const MatchTimer: FunctionComponent<IMatchTimer> = (props) => {

  const [timer, setTimer] = useState<number>(10);

  useEffect(()=> {
    if(timer > 0){
      setTimeout(()=>{
        setTimer(timer-1);
      }, 1000);
    }
  },[timer]);

  return (
    <Row type='flex' align="middle" justify="center">
      <Col span={24} className='col--match-action-question'>
        { timer !== 0 && <>
          <Text className='text--timer'>{timer}</Text>
          <Text className='text--timer text--question'>Will you contribute to the public pool?</Text>
        </> }
        { timer === 0 && <Text className='text--timer'>Time is up!</Text> }
        
      </Col>
    </Row>
  );
};