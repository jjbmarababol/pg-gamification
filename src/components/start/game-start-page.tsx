import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import homeBackground from '../ui/images/bg.gif';

import { PlayerNameForm } from './player-name-form';
import { GameStartMenu } from './game-start-menu';

interface IGameStartPage {}

const PageLayout = styled(Row)`
  min-height: 100vh;
  background-image: url(${homeBackground});
	background-size: cover;
	animation: gradient-bg 60s linear infinite;

  @keyframes gradient-bg {
	0% {
		background-position: 0% 0%;
	}
  25% {
		background-position: 50% 0%;
	}
  50% {
		background-position: 100% 0%;
	}
  75% {
		background-position: 50% 0%;
	}
	100% {
		background-position: 0% 0%;
	}
}`;


const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  padding: 50px 20px 25px;
  border-radius: 5px;
`;

export const GameStartPage:FunctionComponent<IGameStartPage> = (props) => {

  const [ hasStarted, setHasStarted ] = useState<boolean>(false);
  
  return (
    <PageLayout type='flex' justify='center' align='middle'>
      <Col xs={22} md={10}>
        <FormContainer>
          { !hasStarted && <GameStartMenu onClickStart={setHasStarted}/> }
          { hasStarted && <PlayerNameForm/> }
        </FormContainer>
      </Col>
    </PageLayout>
  );
};