import { Typography, Row, Col } from 'antd';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IMatchTimer {
  size?: 'small' | 'medium' | 'large';
}

const { Text } = Typography;

const TimerText = styled(Text)`
  display: block;
  text-align: center;
  line-height: 1;
  font-size: 80px;
  font-weight: bolder;
  padding: 20px;
`;

const QuestionText = styled(TimerText)`
  font-size: 20px;
  line-height: 24px;
`;

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
    <Row align="middle" justify="center">
      <Col span={24}>
        { timer !== 0 && <>
          <TimerText>{timer}</TimerText>
          <QuestionText>Will you contribute to the public pool?</QuestionText>
        </> }
        { timer === 0 && <TimerText>Time is up!</TimerText> }
      </Col>
    </Row>
  );
};