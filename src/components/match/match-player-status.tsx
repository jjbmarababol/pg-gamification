import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button, Icon, Row, Col, Typography } from 'antd';

const { Text, Title } = Typography;

interface IMatchPlayerStatus {}

const PageLayout = styled(Row)`
  min-height: 100vh;
  background-image: url('../ui/images/bg-home.jpg');
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradientBG 15s ease infinite;

  @keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
`;

export const MatchPlayerStatus:FunctionComponent<IMatchPlayerStatus> = (props) => {

  document.documentElement.classList.add()
  return (
    <PageLayout justify='center' align='middle'>
      <Col offset={3} xs={18}>
        Jig - Ready
      </Col>
      <Col offset={3} xs={18}>
      </Col>  
    </PageLayout>
  );
};